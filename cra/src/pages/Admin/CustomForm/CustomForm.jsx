import { Flex, Form, Grid, Input, message, Modal, Select, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useRef, useState } from 'react';
import { IMAGEUPLOAD, APIURL } from '../../../../ApiConstant';
import imageUpload from '../../../assets/upload.jpg';
import axios from 'axios';
import { useFormProvider } from '../../../context/FormProvider';
const CustomForm = (props) => {

    const { setSelectedRecord } = useFormProvider();
    const { selectedRecord, isModalVisible, setIsModalVisible, formItem, action, message: toasterMessage, title, api } = props;

    // Create a form instance
    const [form] = Form.useForm();

    const [imageSrc, setImageSrc] = useState(null);


    console.log("selectedRecord",selectedRecord)

    useEffect(() => {
        if (selectedRecord !== null && selectedRecord !== undefined) {
            form.resetFields(); // ✅ Reset form values
            form.setFieldsValue(selectedRecord); 
           if(selectedRecord?.image) setImageSrc(selectedRecord?.image)
        }
        console.log(selectedRecord?.image);
    }, [selectedRecord,form]);

    const actionForm = async (values) => {
       try {
        if (action === "edit") {
             await axios.patch(`${api}/${selectedRecord.id}`,values);
             form.resetFields();
            // console.log(response.data,"response data from api")
        }
        else if (action === "create") {
             await axios.post(api, values);
             form.resetFields();
            // console.log(response.data,"response data from api")
        }
       } catch (error) {
            console.error('Error:', error);
        }

       }
    

    const handleModalOk = async() => {
        form.validateFields()
            .then( async (values) => {
                console.log('Form values:', values);
                await actionForm(values);
                message.success(toasterMessage);
                setIsModalVisible(false);
                setImageSrc(null);
            })
            .catch((error) => {
                console.log('Validation failed:', error);
                message.error('Please fill out all required fields.');
            });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const RenderForm = (formItem) => {
        const { type, label, name, rules, initialValue, placeHolder ,options, disabled=false } = formItem;
        switch (type) {
            case "file":
                const handleImage = (info) => {
                    // console.log(info,"info");
                    const { response } = info.file;
                    if (response) {
                        // console.log(response.filePath,"file path")
                        // const url = APIURL + response.filePath;
                        // setSelectedRecord({ ...selectedRecord, [name]: response.filePath });
                        // imageRef.current = response.filePath
                        setImageSrc(response.filePath);

                        form.setFieldsValue({ [name]: response.filePath });
                        message.success('Image uploaded successfully!');
                    }
                }
                return (
                    <Flex vertical={true} gap={12}>
                        <label>{label}:</label>
                        <Form.Item name={name} rules={rules}
                        getValueProps={(values)=>{
                            return values
                        }}
                        >
                            <Upload.Dragger
                                name="image"
                                showUploadList={false}
                                style={{ width: '200px', height: '200px' }}
                                action={IMAGEUPLOAD}
                                onChange={handleImage}
                            >
                                { imageSrc ? (
                                    <img
                                        src={APIURL + imageSrc}
                                        alt="Category"
                                        style={{ width: '200px', height: '200px', objectFit: 'contain' }}
                                    />
                                ) : (
                                    <img
                                    src={imageUpload}
                                    alt="Category"
                                    style={{ width: '200px', height: '200px', objectFit: 'contain' }}
                                />
                                )}
                            </Upload.Dragger>
                        </Form.Item>
                    </Flex>

                );
            case "text":
                return (
                    <Flex vertical gap={5}>
                        <label>{label}:</label>
                        <Form.Item name={name} rules={rules} initialValue={selectedRecord ? selectedRecord[name] : initialValue}>
                            <Input placeholder={placeHolder} disabled={disabled}/>
                        </Form.Item>
                    </Flex>
                );
            case "textArea":
                return (
                    <Flex vertical gap={5}>
                        <label>{label}:</label>
                        <Form.Item name={name} rules={rules} initialValue={selectedRecord ? selectedRecord[name] : initialValue}>
                            <TextArea rows={4} placeholder={placeHolder} disabled={disabled} />
                        </Form.Item>
                    </Flex>
                );
            case "number":
                return (
                    <Flex vertical gap={5}>
                        <label>{label}:</label>
                        <Form.Item name={name} rules={rules} initialValue={selectedRecord ? selectedRecord[name] : initialValue}>
                            <Input type="number" placeholder={placeHolder} disabled={disabled} />
                        </Form.Item>
                    </Flex>
                )
                case "select":
                    return (
                        <Flex vertical gap={5}>
                            <label>{label}:</label>
                            <Form.Item name={name} rules={rules} initialValue={selectedRecord ? selectedRecord[name] : initialValue}>
                                <Select options={options} placeholder={placeHolder} disabled={disabled} />
                            </Form.Item>
                        </Flex>
                    )
            default:
                return (
                    <Flex vertical gap={5}>
                        <label>{label}:</label>
                        <Form.Item name={name} rules={rules} initialValue={selectedRecord ? selectedRecord[name] : initialValue}>
                            <Input disabled={disabled}/>
                        </Form.Item>
                    </Flex>
                );
        }
    };

    const {useBreakpoint} = Grid;
    const screens = useBreakpoint();

    return (
        <Modal
            title={title}
            open={isModalVisible}
            onOk={handleModalOk}
            
            onCancel={handleModalCancel}
            okText="Save"
            cancelText="Cancel"
            okButtonProps={{
                disabled : selectedRecord && selectedRecord?.status == 4 ? true : false
            }}
            style={{ top: 20 }} // Adjust the modal's position from the top
            styles={{
                body: {
                    height: screens.md ? '500px' : '500px', // Set the height of the modal body
                    overflowY: 'auto', // Enable vertical scrolling
                    paddingRight: '16px',
                }
            }}
            width={screens.md ? 600 : '90%'}
        >
            <Form form={form} initialValues={selectedRecord}>
                {formItem.map((item, index) => (
                    <React.Fragment key={index}>
                        {RenderForm(item)}
                    </React.Fragment>
                ))}
            </Form>
        </Modal>
    );
};

export default CustomForm;
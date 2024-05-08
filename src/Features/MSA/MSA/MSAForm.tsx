import { CloseOutlined, FilePdfOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, DatePicker, Form, Input, Modal, Space, Spin, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import styles from './MSAForm.module.css'
import { MsaFormPropType } from './types'
import dayjs from "dayjs";
import { useState } from 'react'

const MSAForm = ({
  onFinish,
  showModal,
  handleCancel,
  isModalOpen,
  modalTitle,
  handleMsaRefId,
  initialValues,
  initialFields,
  handleFileUpload,
  fileName,
  spinning,
  fileCancel,
  msaData,
  msaAdded,
  showFile,
  handleFormChange
}:MsaFormPropType) => {
  const [form] = Form.useForm();
  const formFields = [
    { name: "msa_ref_id", value: msaData?.msa_ref_id },
    { name: "client_name", value: msaData?.client_name },
    { name: "region", value: msaData?.region },
    { name: "start_date", value: dayjs(msaData?.start_date)},
    { name: "end_date", value: dayjs(msaData?.end_date)}
  ];
  
  const initialValue = {
    msa_ref_id: msaData?.msa_ref_id || "",
    client_name: msaData?.client_name || "",
    region: msaData?.region || "",
    start_date: msaData?.start_date ? dayjs(msaData.start_date) : null,
    end_date: msaData?.end_date ? dayjs(msaData.end_date) : null
  };
  console.log("initial Values are",initialValue)
    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
      };
  return (
    <>
      <div className={styles.msaform}>
        <Form
        {...layout}
        encType="multipart/form-data" 
        onFinish={onFinish}
        onValuesChange={handleFormChange}
        id="msaForm"
        initialValues={initialValue}
        // fields={formFields}
        >
            <Card className={styles.msaform__maincard}>
                <Space className={styles.msaform__maincard__spacecontainer}>
                <Form.Item
                className={styles.msaform__maincard__msarefid}
                name="msa_ref_id"
                label="MSA Reference ID"
              >
                <Input
                  style={msaAdded ? { color: 'transparent' } : undefined}
                  readOnly
                />
              </Form.Item>
              <Form.Item
                className={styles.msaform__maincard__clientname}
                name="client_name"
                label="Client Name"
                rules={[{ required: true, message: 'Please input a Client Name' }]}
              >
                <Input
                  onChange={msaAdded ? handleMsaRefId : undefined}
                  placeholder="Enter Client Name" 
                />
              </Form.Item>
              <Form.Item
                className={styles.msaform__maincard__region}
                name="region"
                label="Region"
                rules={[
                  { required: true, message: "Please enter the Region" }
                ]}
              >
                <Input
                  name="region"
                  placeholder='Enter Region'
                />
              </Form.Item>
                </Space>
                <Space className={styles.msaform__maincard__spacecontainer}>
                <Form.Item
                className={styles.msaform__maincard__startdate}
                name="start_date"
                label="Start Date"
                rules={[
                    { required: true, message: "Please enter the Start Date" }
                  ]}
              >
                <DatePicker
                className={styles.msaform__maincard__datepicker__startdate}
                  placeholder='Enter Start Date'
                  required
                />
              </Form.Item>
              <Form.Item
                className={styles.msaform__maincard__enddate}
                name="end_date"
                label="End Date"
                rules={[
                  { required: true, message: "Please enter the End Date" },
                ]}
              >
                <DatePicker
                  className={styles.msaform__maincard__datepicker__enddate}
                  placeholder='Enter End Date'
                  required
                />
              </Form.Item>
                </Space>

                <Space className={styles.msaform__maincard__spacecontainer}>
                <Form.Item
                className={styles.msaform__maincard__file}
                name="file"
                label="Upload Master Service Agreement"
              >
                    {showFile ? (
                  <div>
                    <CloseOutlined
                      className={styles.msaform__maincard__file__closeicon}
                      onClick={fileCancel}
                    />
                      <FilePdfOutlined
                        className={styles.msaform__maincard__file__fileicon}
                      />
                      <br />
                      <div>
                      <p className={styles.msaform__maincard__file__filename}>
                      MSA Document
                    </p>
                      </div>
                  </div>
                ) : fileName ? (
                  <>
                    <div>
                    <CloseOutlined
                      className={styles.msaform__maincard__file__closeicon}
                      onClick={fileCancel}
                    />
                      <FilePdfOutlined
                        className={styles.msaform__maincard__file__fileicon}
                      />
                      <br />
                    <p className={styles.msaform__maincard__file__filename}>
                      {fileName}
                    </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Upload
                      action=""
                      listType="picture-card"
                      fileList={[]}
                      accept=".pdf,.docx"
                      customRequest={handleFileUpload}
                      className={styles.uploadicon}
                    >
                      <button
                        style={{ border: 0, background: "none" }}
                        type="button"
                      >
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </button>
                    </Upload>
                  </>
                )}


              </Form.Item>
              <Form.Item
                className={styles.msaform__maincard__comments}
                name="comments"
                label="Comments/Remarks"
              >
                <TextArea
                  rows={4}
                  name="comments"
                  placeholder="Enter Comments/Remarks"
                />
              </Form.Item>
                </Space>
            <br/>
            <Button
            className={styles.msaform__maincard__button}
            onClick={showModal}
            >
              Submit MSA
            </Button>
            </Card>
        </Form>
        <Modal
      title={modalTitle}
			className={styles.modal}
			open={isModalOpen}
			onCancel={handleCancel}
			footer={(_, { CancelBtn }) => (
				<div className={styles.modalfooter}>
				  <Button form="msaForm" key="submit" htmlType="submit" className={styles.okbtn}>OK</Button>
				  <CancelBtn/>
				</div>
			)}
			>
			</Modal>
      <Spin spinning={spinning} fullscreen />
      </div>
    </>
  )
}

export default MSAForm

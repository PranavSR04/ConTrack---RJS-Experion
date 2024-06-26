import styles from './MSAForm.module.css'
import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, Modal, Spin, Upload } from 'antd'
import { MSAFormProps } from './types'
import { CloseOutlined, FilePdfOutlined, PlusOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import dayjs from "dayjs";

const MSAForm = ({
  msaData,
  fileName,
  handleFileUpload,
  beforeUpload,
  handleSubmit,
  isModalVisible,
  handleSubmitForm,
  handleCancel,
  spinning,
  headingText,
   handleInputChange,
   handleStartDateChange,
   handleEndDateChange,
   validateStartDate,
   showFile,
   fileCancel,
   msaAdded,
   hideMsarefid,
   msaRenewed,
   msaEdited,
   modalTitle,
}
  :MSAFormProps) => {
    const formFields = [
      { name: "msa_ref_id", value: msaData.msa_ref_id },
      { name: "client_name", value: msaData.client_name },
      { name: "region", value: msaData.region },
       { name: "start_date", value: msaEdited ? (msaData.start_date ? dayjs(msaData.start_date) : undefined) : msaData.start_date ? dayjs(msaData.start_date) : undefined},
       { name: "end_date", value: msaEdited ? (msaData.end_date ? dayjs(msaData.end_date) : undefined) : msaData.end_date ? dayjs(msaData.end_date) : undefined }
    ];
  return (  
      <div className={styles.MSAForm__Form}>
      <h4 className={styles.MSAForm__Form__Heading}>
            Master Service Agreement Details
          </h4>
      <Form
            name="complex-form"
            encType="multipart/form-data"
            style={{ maxWidth: 600 }}
            fields={formFields}
            requiredMark={false}
          >            
            <div className={styles.MSAForm__Form__row1}>
              <Form.Item
                className={styles.MSAForm__Form__row1__col1}
                name="msa_ref_id"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                label="MSA Reference ID"
                valuePropName={msaData.msa_ref_id}
              >
                <Input
                  name="msa_ref_id"
                  style={msaAdded ? { color: 'transparent' } : undefined}
                  value={hideMsarefid ? '' : msaData.msa_ref_id}
                  readOnly
                  className={styles.MSAForm__Form__input__msa_ref_id}
                />
              </Form.Item>
              <Form.Item
                className={styles.MSAForm__Form__row1__col2}
                name="client_name"
                label={
                  <div>
                    Client Name
                    <span style={{ color: "red" }}> *</span>
                  </div>
                }
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={msaAdded ? [
                  { required: true, message: "Please enter the Client Name" },
                  {
                    pattern: /^.{3,}$/,
                    message: "Client name must contain at least 3 characters",
                  },
                ] : []}
              >
                <Input
                value={msaData.client_name}
                  name="client_name"
                  className={styles.MSAForm__Form__inputs}
                 onChange= {(e) => handleInputChange(e)} 
                 disabled={msaRenewed ? true : false}
                  placeholder="Enter Client Name" 
                />
              </Form.Item>
              <Form.Item
                className={styles.MSAForm__Form__row1__col3}
                name="region"
                label={
                  <div>
                    Region
                    <span style={{ color: "red" }}> *</span>
                  </div>
                }
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={msaAdded ? [
                  { required: true, message: "Please enter the Region" }
                ] : []}
              >

                <Input
                  name="region"
                  className={styles.MSAForm__Form__inputs}
                  onChange={handleInputChange}
                  disabled={msaRenewed ? true : false}
                />
              </Form.Item>
            </div>

            <div className={styles.MSAForm__Form__row2}>
              <Form.Item
                className={styles.MSAForm__Form__row2__col1}
                name="start_date"
                label={
                  <div>
                    Start Date
                    <span style={{ color: "red" }}> *</span>
                  </div>
                }
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker
                  className={styles.MSAForm__Form__inputs}
                  onChange={handleStartDateChange}
                  required
                />
              </Form.Item>
              <Form.Item
                className={styles.MSAForm__Form__row2__col2}
                name={"end_date"}
                label={
                  <div>
                    End Date
                    <span style={{ color: "red" }}> *</span>
                  </div>
                }
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Please enter the End Date" },
                  {
                    validator: validateStartDate,
                  }
                ]}
              >
                <DatePicker
                  className={styles.MSAForm__Form__inputs}
                  onChange={handleEndDateChange}
                  required
                />
              </Form.Item>
            </div>
            <div className={styles.MSAForm__Form__row3}>
              <Form.Item
                name="file"
                className={styles.MSAForm__Form__row3__col1}
                label={
                  <div>
                    Upload Master Service Agreement
                    <span style={{ color: "red" }}> *</span>
                  </div>
                }
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={msaEdited
                  ? []
                  : [{ required: true, message: "Please upload File" }]}
              >
                {showFile ? (
                  <div className={styles.container_file}>
                    <CloseOutlined
                      className={styles.file__closeicon}
                      onClick={fileCancel}
                    />
                      <FilePdfOutlined
                        className={styles.MSAForm__Form__row3__col1__fileicon}
                      />
                      <br />
                      <div>
                      <p className={styles.MSAForm__Form__row3__col1__filename}>
                      MSA Document
                    </p>
                      </div>
                  </div>
                ) : fileName ? (
                  <>
                    <div>
                      <FilePdfOutlined
                        className={styles.MSAForm__Form__row3__col1__fileicon}
                      />
                      <br />
                    <p className={styles.MSAForm__Form__row3__col1__filename}>
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
                      beforeUpload={beforeUpload}
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
                name={"comments"}
                className={styles.MSAForm__Form__row3__col2}
                label={
                  <div>
                    Comments/Remarks
                    <span style={{ color: "red" }}> *</span>
                  </div>
                }
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <TextArea
                  rows={4}
                  name="comments"
                  onChange={handleInputChange}
                  maxLength={200}
                />
              </Form.Item>
            </div>
            <Button
              className={styles.MSAForm__Form__Button}
              type="primary"
              htmlType='submit'
              onClick={handleSubmit}
            >
              {headingText} MSA
            </Button>

            <Modal
              title={modalTitle}
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={[
                <Button
                  className={styles.MSAForm__Form__ModalOk}
                  type='primary'
                  key="ok"
                  onClick={handleSubmitForm}
                >
                  Yes
                </Button>,
                <Button
                  key="cancel"
                  className={styles.modal_cancelbutton}
                  onClick={handleCancel}
                >
                  No
                </Button>,
              ]}
            >
            </Modal>
            <Spin spinning={spinning} fullscreen />
          </Form>
      </div>
    
  )
}

export default MSAForm;

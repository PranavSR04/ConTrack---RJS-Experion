import { useEffect, useState } from "react";
import { AddContractPropType, Milestone } from "./types";
import styles from "./AddContract.module.css";
import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Spin,
  Upload,
} from "antd";
import {
  PlusOutlined,
  CloseCircleOutlined,
  UploadOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
// import BreadCrumbs from "../../Components/BreadCrumbs/Breadcrumbs";
import moment, { Moment } from "moment";

const AddContract = ({
  contractType,
  selectClient,
  selectUser,
  handleMilestoneChange,
  handleSubmit,
  handleFileUpload,
  handleCommentsRemarksChange,
  handleTotalContractValueChange,
  handlePaymentPercentageChange,
  handleAmount,
  removeMilestone,
  handleAddMilestone,
  handleContractTypeChange,
  getClientName,
  getUserName,
  handleStartDateChange,
  handleEndDateChange,
  handleDateOfSignatureChange,
  validateEndDate,
  validateDateOfSignature,
  checkPercentage,
  checkSumOfPercentage,
  clientNameOptions,
  userNameOptions,
  contractDetails,
  setContractDetails,
  milestones,
  spinning,
}: AddContractPropType) => {
  const [upMiles, setUPMiles] = useState<Milestone[]>();

  useEffect(() => {
    setUPMiles(milestones);
  }, [milestones]);

  return (
    <>
      <div className="container">
        {/* <BreadCrumbs
          style={{
            marginLeft: "10rem",
            marginTop: "0.7rem",
            fontSize: 16,
            fontStyle: "italic",
          }}
        /> */}
        <h1
          style={{
            marginLeft: "10rem",
            paddingTop: "0.7rem",
            fontWeight: 700,
            fontSize: "1.2rem",
          }}
        >
          ADD CONTRACT
        </h1>
        <>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 1200 }}
            onFinish={handleSubmit}
            encType="multipart/form-data"
          >
            <div className={`contract_details ${styles.contract_details}`}>
              <br />
              <div
                className={`contract_details_heading ${styles.contract_details_heading}`}
              >
                Contract Details
              </div>

              <div
                style={{
                  display: "flex",
                  padding: "-0.6rem 1rem",
                  fontFamily: '"Montserrat", sans-serif',
                }}
              >
                <Form.Item
                  label="Client Name"
                  labelCol={{ span: 15 }}
                  wrapperCol={{ span: 11 }}
                  required
                  style={{ marginLeft: "-2.4rem" }}
                >
                  <AutoComplete
                    options={clientNameOptions}
                    onSelect={selectClient}
                    onSearch={getClientName}
                    placeholder="Client Name"
                    style={{ width: "10rem" }}
                  />
                </Form.Item>
                <Form.Item
                  label="Contract ID"
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 14 }}
                  style={{ paddingLeft: "1rem", marginLeft: "4rem" }}
                  required
                >
                  <Input
                    value={contractDetails.contract_ref_id}
                    onChange={(e) =>
                      setContractDetails({
                        ...contractDetails,
                        contract_ref_id: e.target.value,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Region"
                  required
                  labelCol={{ span: 9 }}
                  wrapperCol={{ span: 12 }}
                >
                  <Input value={contractDetails.region} disabled />
                </Form.Item>
                <Form.Item
                  label="DU"
                  name="du"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ paddingLeft: "2rem", marginLeft: "-3.5rem" }}
                  required
                >
                  <Select
                    placeholder="DU"
                    value={contractDetails.du}
                    style={{ width: "100%" }}
                    onChange={(value) =>
                      setContractDetails({
                        ...contractDetails,
                        du: value,
                      })
                    }
                  >
                    <Select.Option value="DU1">DU1</Select.Option>
                    <Select.Option value="DU2">DU2</Select.Option>
                    <Select.Option value="DU3">DU3</Select.Option>
                    <Select.Option value="DU4">DU4</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div style={{ display: "flex", padding: "-0.6rem 1rem" }}>
                <Form.Item
                  label="Start Date"
                  labelCol={{ span: 11 }}
                  wrapperCol={{ span: 21 }}
                  name="start_date"
                  rules={[
                    {
                      required: true,
                      message: "Please select a Start Date",
                    },
                  ]}
                >
                  <DatePicker
                    value={
                      contractDetails.start_date
                        ? moment(contractDetails.start_date)
                        : null
                    }
                    onChange={handleStartDateChange}
                  />
                </Form.Item>
                <Form.Item
                  label="End Date"
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 26 }}
                  style={{ paddingLeft: "2rem" }}
                  name="end_date"
                  rules={[
                    {
                      required: true,
                      message: "Please select an End Date",
                    },
                    {
                      validator: validateEndDate,
                    },
                  ]}
                >
                  <DatePicker
                    value={
                      contractDetails.end_date
                        ? moment(contractDetails.end_date)
                        : null
                    }
                    onChange={handleEndDateChange}
                  />
                </Form.Item>
                <Form.Item
                  label="Date Of Signature"
                  name="date_of_signature"
                  labelCol={{ span: 14 }}
                  wrapperCol={{ span: 23 }}
                  style={{ paddingLeft: "2rem" }}
                  rules={[
                    {
                      required: true,
                      message: "Please select a Date of Signature",
                    },
                    {
                      validator: validateDateOfSignature,
                    },
                  ]}
                >
                  <DatePicker
                    value={
                      contractDetails.date_of_signature
                        ? moment(contractDetails.date_of_signature)
                        : null
                    }
                    onChange={handleDateOfSignatureChange}
                  />
                </Form.Item>
              </div>
              <div style={{ display: "flex", padding: "-0.6rem 1rem" }}>
                <Form.Item
                  label="Contract Type"
                  name="contract_type"
                  labelCol={{ span: 244 }}
                  wrapperCol={{ span: 19 }}
                  style={{ marginLeft: "1.3rem" }}
                  required
                >
                  <Select
                    placeholder="Contract Type"
                    onChange={handleContractTypeChange}
                  >
                    <Select.Option value="FF">Fixed Fee</Select.Option>
                    <Select.Option value="TM">T&M</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>

            {contractType === "FF" && (
  <>
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        padding: "-0.6rem 1rem",
        fontFamily: '"Montserrat", sans-serif',
        width: "120%",
      }}
    >
      <div
        className={`contract_details ${styles.contract_details}`}
        style={{ marginLeft: "8rem" }}
      >
        <div
          className={`contract_details_heading ${styles.contract_details_heading}`}
        >
          <br />
          Milestone Details
        </div>
        <div
          style={{
            paddingTop: "0.5rem",
            marginTop: "-3rem",
            marginLeft: "16.5rem",
          }}
        >
          <Form.Item
            label="Total Contract Value (USD)"
            name="estimated_amount"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            required
          >
            <InputNumber
              style={{ width: "100%" }}
              onChange={handleTotalContractValueChange}
            />
          </Form.Item>
        </div>
        {/* <div
          style={{
            marginLeft: "49.5rem",
            marginTop: "-4rem",
            padding: "0.5rem",
          }}
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddMilestone}
            style={{ fontWeight: "bold" }}
          >
            Add
          </Button>
        </div> */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            padding: "1rem",
            alignItems: "center",
          }}
        >
          <div style={{ width: "30%", marginRight: "2.3rem" }}>
            <div
              style={{
                marginBottom: "0.5rem",
                marginLeft: "0.6rem",
              }}
            >
              Milestones
            </div>
          </div>
          <div style={{ width: "30%", marginRight: "-0.5rem" }}>
            <div
              style={{
                marginBottom: "0.5rem",
                marginLeft: "-0.7rem",
              }}
            >
              Expected Completion Date
            </div>
          </div>
          <div style={{ width: "10%", marginRight: "0.8rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>Payment(%)</div>
          </div>
          <div style={{ width: "20%", marginRight: "1rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>Payment Amount(USD)</div>
          </div>
        </div>
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {upMiles?.map((milestone, index) => (
                <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    padding: "1rem",
                    paddingLeft: "3rem",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "30%",
                      marginRight: "1rem",
                      marginBottom: "0.5rem",
                      marginTop: "-1.7rem",
                    }}
                  >
                    <Form.Item
                      name={`milestones[${index}].milestones`}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Please enter milestone description!",
                        },
                      ]}
                    >
                      <Input
                        value={milestone.milestones || ""}
                        onChange={(e) =>
                          handleMilestoneChange(index, "milestones", e.target.value)
                        }
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </div>
                  <div
                    style={{
                      width: "30%",
                      marginRight: "1rem",
                      marginBottom: "0.5rem",
                      marginTop: "-1.7rem",
                    }}
                  >
                    <Form.Item
                      name={`milestones[${index}].expectedCompletionDate`}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Please enter Expected Completion Date!",
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        onChange={(date) =>
                          handleMilestoneChange(index, "expectedCompletionDate", date)
                        }
                      />
                    </Form.Item>
                  </div>
                  <div
                    style={{
                      width: "10%",
                      marginRight: "1rem",
                      marginBottom: "0.5rem",
                      marginTop: "-1.7rem",
                    }}
                  >
                    <Form.Item
                      name={`milestones[${index}].percentage`}
                      labelCol={{ span: 20 }}
                      wrapperCol={{ span: 20 }}
                      required
                      rules={[
                        {
                          required: true,
                          message: "Please input percentage!",
                        },
                        { validator: checkPercentage },
                        {
                          validator: (_, value) =>
                            checkSumOfPercentage(index, value),
                          validateTrigger: "onSubmit",
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: "100%" }}
                        onChange={(value) =>
                          handlePaymentPercentageChange(index, value as number)
                        }
                      />
                    </Form.Item>
                  </div>
                  <div
                    style={{
                      width: "20%",
                      marginRight: "1rem",
                      marginBottom: "0.5rem",
                      marginTop: "-1.7rem",
                    }}
                  >
                    <Form.Item
                      name={`milestones[${index}].amount`}
                      labelCol={{ span: 20 }}
                      wrapperCol={{ span: 20 }}
                    >
                      <Input
                        style={{ display: "none" }}
                        value={milestone.amount ? milestone.amount : 0}
                      />

                      <InputNumber
                        style={{ width: "100%" }}
                        value={milestone.amount || 0}
                        disabled
                      />
                    </Form.Item>
                  </div>

                  {upMiles.length > 1 && (
                    <MinusCircleOutlined onClick={() => remove(index)} />
                  )}
                </div>
                </Space>
              ))}
             <Form.Item>
        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
          Add Milestone
        </Button>
      </Form.Item>
            </>
          )}
        </Form.List>
      </div>
    </div>

    <div
      className={`contract_details ${styles.contract_details}`}
      style={{ width: "46.5%" }}
    >
      <br />
      <div
        className={`contract_details_heading ${styles.contract_details_heading}`}
      >
        Associated Members
      </div>
      <div style={{ display: "flex", padding: "1rem", width: "100%" }}>
        <Form.Item
          style={{ width: "100%", height: "100%" }}
          required
        >
          <Select
            mode="tags"
            placeholder="Please select or type"
            allowClear
            options={userNameOptions}
            onSearch={getUserName}
            onChange={selectUser}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "5px",
              paddingLeft: "10px",
            }}
          />
        </Form.Item>
      </div>
    </div>

    <div style={{ display: "flex", width: "100%" }}>
      <div
        className={`contract_details ${styles.contract_details}`}
        style={{ width: "46.5%", height: "10.5rem" }}
      >
        <br />
        <div
          className={`contract_details_heading ${styles.contract_details_heading}`}
        >
          Upload Work Schedule
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "8rem",
            padding: ".5rem",
            width: "100%",
          }}
        >
          <div
            style={{
              border: "2px dashed #ccc",
              paddingBottom: "1rem",
              textAlign: "center",
              borderRadius: "5px",
              width: "33rem",
              marginTop: "-1.5rem",
            }}
          >
            <Upload
              accept=".pdf"
              customRequest={handleFileUpload}
              maxCount={1}
            >
              <div style={{ marginTop: "1rem" }}>
                <p>Drag & drop or click to upload</p>
                <Button icon={<UploadOutlined />}>
                  Select File
                </Button>
              </div>
            </Upload>
          </div>
        </div>
      </div>
      <div
        className={`contract_details ${styles.contract_details}`}
        style={{
          width: "36%",
          marginLeft: "2rem",
          height: "10.5rem",
        }}
      >
        <br />
        <div
          className={`contract_details_heading ${styles.contract_details_heading}`}
        >
          Comments and Remarks
        </div>
        <div
          style={{
            display: "flex",
            padding: "1rem",
            width: "100%",
          }}
        >
          <Form.Item
            wrapperCol={{ span: 24 }}
            style={{ width: "32rem", marginTop: "-1rem" }}
            rules={[
              {
                max: 200,
                message:
                  "Maximum 200 characters allowed for comments",
              },
            ]}
            validateTrigger="onChange"
            name="comments"
          >
            <Input.TextArea
              rows={4.5}
              placeholder="Enter comments and remarks..."
              value={contractDetails.comments ?? ""}
              onChange={handleCommentsRemarksChange}
            />
          </Form.Item>
        </div>
      </div>
    </div>
  </>
)}


            {contractType === "TM" && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    padding: "-0.6rem 1rem",
                    fontFamily: '"Montserrat", sans-serif',
                    width: "120%",
                  }}
                >
                  <div
                    className={`contract_details ${styles.contract_details}`}
                    style={{ marginLeft: "8rem" }}
                  >
                    <div
                      className={`contract_details_heading ${styles.contract_details_heading}`}
                    >
                      <br />
                      Milestone Details
                    </div>

                    <div
                      style={{
                        paddingTop: "0.5rem",
                        marginTop: "-3rem",
                        marginLeft: "16.5rem",
                      }}
                    >
                      <Form.Item
                        label="Total Contract Value (USD)"
                        name="estimated_amount"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 8 }}
                        required
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          onChange={handleTotalContractValueChange}
                        />
                      </Form.Item>
                    </div>

                    <div
                      style={{
                        marginLeft: "49.5rem",
                        marginTop: "-4rem",
                        padding: "0.5rem",
                      }}
                    >
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddMilestone}
                        style={{ fontWeight: "bold" }}
                      >
                        Add
                      </Button>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        padding: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: "30%", marginRight: "2.3rem" }}>
                        <div
                          style={{
                            marginBottom: "0.5rem",
                            marginLeft: "0.6rem",
                          }}
                        >
                          Milestones
                        </div>
                      </div>
                      <div style={{ width: "30%", marginRight: "-0.5rem" }}>
                        <div
                          style={{
                            marginBottom: "0.5rem",
                            marginLeft: "-0.7rem",
                          }}
                        >
                          Expected Completion Date
                        </div>
                      </div>
                      <div style={{ width: "20%", marginRight: "1rem" }}>
                        <div style={{ marginBottom: "0.5rem" }}>
                          Payment Amount(US$)
                        </div>
                      </div>
                    </div>

                    {milestones.map((milestone, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          padding: "1rem",
                          paddingLeft: "3rem",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "30%",
                            marginRight: "1rem",
                            marginBottom: "0.5rem",
                            marginTop: "-1.7rem",
                          }}
                        >
                          <Form.Item
                            name={`milestones[${index}].milestones`}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                              {
                                required: true,
                                message: "Please enter milestone description!",
                              },
                            ]}
                          >
                            <Input
                              value={milestone.milestones || ""}
                              onChange={(e) =>
                                handleMilestoneChange(
                                  index,
                                  "milestones",
                                  e.target.value
                                )
                              }
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </div>
                        <div
                          style={{
                            width: "30%",
                            marginRight: "1rem",
                            marginBottom: "0.5rem",
                            marginTop: "-1.7rem",
                          }}
                        >
                          <Form.Item
                            name={`milestones[${index}].expectedCompletionDate`}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                              {
                                required: true,
                                message:
                                  "Please enter Expected Completion Date!",
                              },
                            ]}
                          >
                            <DatePicker
                              style={{ width: "100%" }}
                              onChange={(date) =>
                                handleMilestoneChange(
                                  index,
                                  "expectedCompletionDate",
                                  date
                                )
                              }
                            />
                          </Form.Item>
                        </div>

                        <div
                          style={{
                            width: "20%",
                            marginRight: "1rem",
                            marginBottom: "0.5rem",
                            marginTop: "-1.7rem",
                          }}
                        >
                          <Form.Item
                            name={`milestones[${index}].amount`}
                            labelCol={{ span: 20 }}
                            wrapperCol={{ span: 20 }}
                            rules={[
                              {
                                required: true,
                                message: "Please enter amount!",
                              },
                            ]}
                          >
                            <InputNumber
                              style={{ width: "100%" }}
                              value={milestone.amount}
                              onChange={(e) => handleAmount(e)}
                            />
                          </Form.Item>
                        </div>
                        {index >= 0 && (
                          <Button
                            type="text"
                            style={{
                              color: "red",
                              marginLeft: "-2rem",
                              marginTop: "-3.5rem",
                            }}
                            onClick={() => removeMilestone(index)}
                            icon={<CloseCircleOutlined />}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`contract_details ${styles.contract_details}`}
                  style={{ width: "46.5%" }}
                >
                  <br />
                  <div
                    className={`contract_details_heading ${styles.contract_details_heading}`}
                  >
                    Associated Members
                  </div>
                  <div
                    style={{ display: "flex", padding: "1rem", width: "100%" }}
                  >
                    <Form.Item
                      style={{ width: "100%", height: "100%" }}
                      required
                    >
                      <Select
                        mode="tags"
                        placeholder="Please select or type"
                        allowClear
                        options={userNameOptions}
                        onSearch={getUserName}
                        onChange={selectUser}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "5px",
                          paddingLeft: "10px",
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>

                <div style={{ display: "flex", width: "100%" }}>
                  <div
                    className={`contract_details ${styles.contract_details}`}
                    style={{ width: "46.5%", height: "10.5rem" }}
                  >
                    <br />
                    <div
                      className={`contract_details_heading ${styles.contract_details_heading}`}
                    >
                      Upload Work Schedule
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "8rem",
                        padding: ".5rem",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          border: "2px dashed #ccc",
                          paddingBottom: "1rem",
                          textAlign: "center",
                          borderRadius: "5px",
                          width: "33rem",
                          marginTop: "-1.5rem",
                        }}
                      >
                        <Upload
                          accept=".pdf"
                          customRequest={handleFileUpload}
                          maxCount={1}
                        >
                          <div style={{ marginTop: "1rem" }}>
                            <p>Drag & drop or click to upload</p>
                            <Button icon={<UploadOutlined />}>
                              Select File
                            </Button>
                          </div>
                        </Upload>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`contract_details ${styles.contract_details}`}
                    style={{
                      width: "36%",
                      marginLeft: "2rem",
                      height: "10.5rem",
                    }}
                  >
                    <br />
                    <div
                      className={`contract_details_heading ${styles.contract_details_heading}`}
                    >
                      Comments and Remarks
                    </div>
                    <div
                      style={{
                        display: "flex",
                        padding: "1rem",
                        width: "100%",
                      }}
                    >
                      <Form.Item
                        wrapperCol={{ span: 24 }}
                        style={{ width: "32rem", marginTop: "-1rem" }}
                        rules={[
                          {
                            max: 200,
                            message:
                              "Maximum 200 characters allowed for comments",
                          },
                        ]}
                        validateTrigger="onChange"
                        name="comments"
                      >
                        <Input.TextArea
                          rows={4.5}
                          placeholder="Enter comments and remarks..."
                          value={contractDetails.comments ?? ""}
                          onChange={handleCommentsRemarksChange}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </>
            )}
            <Form.Item
              wrapperCol={{ offset: 4, span: 14 }}
              style={{ marginRight: "15rem" }}
            >
              <Button
                type="primary"
                htmlType="submit"
                className={
                  contractType
                    ? styles.submitButton
                    : `${styles.submitButton} ${styles.submitButtonDisabled}`
                }
                disabled={!contractType}
              >
                Add Contract
              </Button>
            </Form.Item>
            <Spin spinning={spinning} fullscreen />
          </Form>
        </>
      </div>
      
    </>
  );
};

export default AddContract;

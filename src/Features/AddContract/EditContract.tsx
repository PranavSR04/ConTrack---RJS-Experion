import { EditContractPropType } from "./types";
import moment from "moment";
import styles from "./AddContract.module.css";

import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  Upload,
} from "antd";
import {
  PlusOutlined,
  CloseCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Toast from "../../Components/Toast/Toast";
// import BreadCrumbs from "../../Components/BreadCrumbs/Breadcrumbs";

const EditContract = ({
  handleUpdate,
  contractEdited,
  contractType,
  selectClient,
  handleMilestoneChange,
  handleFileUpload,
  handleCommentsRemarksChange,
  handleTotalContractValueChange,
  handlePaymentPercentageChange,
  handleAmount,
  removeMilestone,
  handleAddMilestone,
  getClientName,
  clientNameOptions,
  contractDetails,
  setContractDetails,
  existingMilestone,
  spinning,
}: EditContractPropType) => {
  //Function to get Contract Type
  const getContractTypeName = () => {
    switch (contractDetails.contract_type) {
      case "FF":
        return "Fixed Fee";
      case "TM":
        return "T&M";
      default:
        return "";
    }
  };

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
          EDIT CONTRACT
        </h1>
        <>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 1200 }}
            onFinish={handleUpdate}
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
                    value={contractDetails.client_name}
                    options={clientNameOptions}
                    onSelect={selectClient}
                    onSearch={getClientName}
                    placeholder={contractDetails.client_name}
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
                  labelCol={{ span: 9 }}
                  wrapperCol={{ span: 15 }}
                  style={{ paddingLeft: "2rem", marginLeft: "-3.5rem" }}
                  required
                >
                  <Select
                    defaultValue={contractDetails.du}
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
                  required
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    value={
                      contractDetails.start_date
                        ? moment(contractDetails.start_date, "YYYY-MM-DD")
                        : null
                    }
                    onChange={(value) =>
                      setContractDetails({
                        ...contractDetails,
                        start_date: value ? value.format("YYYY-MM-DD") : "",
                      })
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="End Date"
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 26 }}
                  style={{ paddingLeft: "2rem" }}
                  required
                >
                  <DatePicker
                    value={
                      contractDetails.end_date
                        ? moment(contractDetails.end_date, "YYYY-MM-DD")
                        : undefined
                    }
                    onChange={(value) =>
                      setContractDetails({
                        ...contractDetails,
                        end_date: value ? value.format("YYYY-MM-DD") : "",
                      })
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Date Of Signature"
                  labelCol={{ span: 14 }}
                  wrapperCol={{ span: 23 }}
                  style={{ paddingLeft: "2rem" }}
                  required
                >
                  <DatePicker
                    value={
                      contractDetails.date_of_signature
                        ? moment(
                            contractDetails.date_of_signature,
                            "YYYY-MM-DD"
                          )
                        : undefined
                    }
                    onChange={(value) =>
                      setContractDetails({
                        ...contractDetails,
                        date_of_signature: value
                          ? value.format("YYYY-MM-DD")
                          : "",
                      })
                    }
                  />
                </Form.Item>
              </div>
              <div style={{ display: "flex", padding: "-0.6rem 1rem" }}>
                <Form.Item
                  label="Contract Type"
                  required
                  labelCol={{ span: 244 }}
                  wrapperCol={{ span: 19 }}
                  style={{ marginLeft: "1.3rem" }}
                >
                  <Input value={getContractTypeName()} disabled />
                </Form.Item>
              </div>
            </div>

            {contractDetails.contract_type === "FF" && (
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
                    style={{ marginLeft: "8 rem" }}
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
                        label="Estimated Amount"
                        required
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 8 }}
                      >
                        <InputNumber
                          value={contractDetails.estimated_amount}
                          onChange={(value) =>
                            handleTotalContractValueChange(value as number)
                          }
                          style={{ width: "100%" }}
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

                    <div>
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
                          <div style={{ marginBottom: "0.5rem" }}>
                            Payment(%)
                          </div>
                        </div>
                        <div style={{ width: "20%", marginRight: "1rem" }}>
                          <div style={{ marginBottom: "0.5rem" }}>
                            Payment Amount(US$)
                          </div>
                        </div>
                      </div>
                      {existingMilestone &&
                        existingMilestone.map((milestone, index) => (
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
                                name={`milestones[${index}].milestone_desc`}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                initialValue={milestone.milestone_desc}
                                required
                              >
                                <Input
                                  onChange={(e) =>
                                    handleMilestoneChange(
                                      index,
                                      "milestone_desc",
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
                                marginBottom: "2.1rem",
                                marginTop: "-1.7rem",
                              }}
                            >
                              <DatePicker
                                style={{ width: "100%" }}
                                value={
                                  milestone.milestone_enddate
                                    ? moment(
                                        milestone.milestone_enddate,
                                        "YYYY-MM-DD"
                                      )
                                    : undefined
                                }
                                onChange={(value) =>
                                  handleMilestoneChange(
                                    index,
                                    "milestone_enddate",
                                    value ? value.format("YYYY-MM-DD") : ""
                                  )
                                }
                              />
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
                                initialValue={milestone.percentage}
                              >
                                <InputNumber
                                  style={{ width: "100%" }}
                                  onChange={(value) =>
                                    handlePaymentPercentageChange(
                                      index,
                                      value as number
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
                                required
                                initialValue={milestone.amount}
                              >
                                <InputNumber
                                  style={{ width: "100%" }}
                                  value={milestone.amount}
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
                </div>
              </>
            )}

            {contractDetails.contract_type === "TM" && (
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
                        label="Estimated Amount"
                        required
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 8 }}
                      >
                        <InputNumber
                          value={contractDetails.estimated_amount}
                          onChange={(value) =>
                            handleTotalContractValueChange(value as number)
                          }
                          style={{ width: "100%" }}
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

                    <div>
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
                      {existingMilestone &&
                        existingMilestone.map((milestone, index) => (
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
                                name={`milestones[${index}].milestone_desc`}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                initialValue={milestone.milestone_desc}
                                required
                              >
                                <Input
                                  onChange={(e) =>
                                    handleMilestoneChange(
                                      index,
                                      "milestone_desc",
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
                                marginBottom: "2.1rem",
                                marginTop: "-1.7rem",
                              }}
                            >
                              <DatePicker
                                style={{ width: "100%" }}
                                value={
                                  milestone.milestone_enddate
                                    ? moment(
                                        milestone.milestone_enddate,
                                        "YYYY-MM-DD"
                                      )
                                    : undefined
                                }
                                onChange={(value) =>
                                  handleMilestoneChange(
                                    index,
                                    "milestone_enddate",
                                    value ? value.format("YYYY-MM-DD") : ""
                                  )
                                }
                              />
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
                                initialValue={milestone.amount}
                                required
                              >
                                <InputNumber
                                  style={{ width: "100%" }}
                                  value={milestone.amount}
                                  onChange={(e) => handleAmount(e)}
                                />
                              </Form.Item>
                            </div>
                            {index > 0 && (
                              <Button
                                type="text"
                                style={{
                                  color: "red",
                                  marginLeft: "-2rem",
                                  marginTop: "-3.3rem",
                                }}
                                onClick={() => removeMilestone(index)}
                                icon={<CloseCircleOutlined />}
                              />
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* <div
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
                <Form.Item style={{ width: "100%", height: "100%" }} required>
                  <Select
                    mode="tags"
                    placeholder="Please select or type"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "5px",
                      paddingLeft: "10px",
                    }}
                  />
                </Form.Item>
              </div>
            </div> */}

            <div style={{ display: "flex", width: "100%" }}>
              <div
                className={`contract_details ${styles.contract_details}`}
                style={{ width: "46.5%", height: "10.5rem" }}
              >
                <br />
                <div
                  className={`contract_details_heading ${styles.contract_details_heading}`}
                >
                  Upload Addendum
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
                      //   action=""
                      customRequest={handleFileUpload}
                    >
                      <div style={{ marginTop: "1rem" }}>
                        <p>Drag & drop or click to upload</p>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                      </div>
                    </Upload>
                  </div>
                </div>
              </div>

              <div
                className={`contract_details ${styles.contract_details}`}
                style={{ width: "36%", marginLeft: "2rem", height: "10.5rem" }}
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
                  >
                    <Input.TextArea
                      rows={4.5}
                      value={contractDetails.comments || ""}
                      onChange={(e) => handleCommentsRemarksChange(e)}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "53rem",
                marginTop: "1rem",
                paddingBottom: "1rem",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "2rem" }}
                className={
                  contractType
                    ? styles.submitButton
                    : `${styles.submitButton} ${styles.submitButtonDisabled}`
                }
              >
                Update
              </Button>
            </div>
            <Spin spinning={spinning} fullscreen />
          </Form>
        </>
      </div>
    </>
  );
};

export default EditContract;

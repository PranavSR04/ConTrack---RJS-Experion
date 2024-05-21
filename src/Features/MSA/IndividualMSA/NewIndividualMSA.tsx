import { IndividualMsaPropType } from "./types";
import MsaHeaderHandler from "./Header/MsaHeaderHandler";
import styles from "./NewIndividualMSA.module.css";
import ContractList from "./ContractList/ContractList";
import ContractListHandler from "./ContractList/ContractListHandler";
import MsaDocHandler from "./MsaDoc/MsaDocHAndler";
import MsaComments from "./Comments/MsaComments";
import MsaCommentsHandler from "./Comments/MsaCommentsHandler";
import MsaOverviewHandler from "./OverView/MsaOverviewHandler";
import MsaRevenueHandler from "./MsaRevenue/MsaRevenueHandler";
import { Col, Row, Spin } from "antd";

const NewIndividualMSA = ({
  responses,
  msa_id,
  loading,
}: IndividualMsaPropType) => {
  return (
    <>
    <Spin tip="Loading" size="large" spinning={loading}>
      <div className={styles.maincontainer}>
        <Row>
          <Col span={24}>
            <MsaHeaderHandler responses={responses} id={msa_id && msa_id} />
          </Col>
        </Row>
        <Row>
          <Row>
            <Col span={24}>
              <MsaOverviewHandler responses={responses} loading={loading} />
            </Col>
          </Row>
          <Row gutter={50}>
            <Col span={20}>
            <div className={styles.maincontainer__revenue}>
              <MsaRevenueHandler msa_id={msa_id}/>
            </div>
            </Col>
            <Col span={4}>
            <div className={styles.maincontainer__doclist}>
              <MsaDocHandler response={responses?responses:undefined}  />
            </div>
            </Col>
          </Row>
        </Row>
        <Row gutter={10}>
          <Col span={6}>
              <MsaCommentsHandler responses={responses} loading={loading} />
          </Col>
          <Col span={12}>
              <ContractListHandler responses={responses} id={msa_id} />
          </Col>
        </Row>
      </div>
    </Spin>
    </>
  );
};

export default NewIndividualMSA;

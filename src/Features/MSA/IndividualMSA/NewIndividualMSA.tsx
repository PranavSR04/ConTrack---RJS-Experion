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
import ContractStatusGraphHandler from "./ContractStatusGraph/ContractStatusGraphHandler";

const NewIndividualMSA = ({
  responses,
  msa_id,
  loading,
}: IndividualMsaPropType) => {
  return (
    <>
      <div className={styles.maincontainer}>
        <Row>
          <Col span={24}>
            <MsaHeaderHandler responses={responses} id={msa_id && msa_id} />
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <Row>
              <Col>
              <MsaOverviewHandler responses={responses} loading={loading} />
              </Col>
            </Row>
            <Row>
            <div className={styles.maincontainer__revenue}>
            <Col>
              <MsaRevenueHandler msa_id={msa_id}/>
            </Col>
            </div>
            </Row>
          </Col>
          <Col span={6}>
            <Row>
              <Col span={24}>
              <ContractStatusGraphHandler responses={responses} loading={loading}/>
              </Col>
            </Row>
            <Row>
            <div className={styles.maincontainer__doclist}>
              <Col span={24}>
              <MsaDocHandler response={responses?responses:undefined}  />
              </Col>
            </div>
            </Row>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={7}>
              <MsaCommentsHandler responses={responses} loading={loading} />
          </Col>
          <Col span={12}>
              <ContractListHandler responses={responses} id={msa_id} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default NewIndividualMSA;

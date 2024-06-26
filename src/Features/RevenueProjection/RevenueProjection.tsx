import React, { useContext, useState } from "react";
import styles from "./RevenueProjection.module.css";
import { Card, ConfigProvider, Modal, Segmented } from "antd";
import { RevenueProjectionPropType } from "./types";
import { HiOutlineFilter } from "react-icons/hi";
import { DatePicker } from "antd";
import LineChartHandler from "../../Components/LineChart/LineChartHandler";
import { NavContexts } from "../../Components/NavContext/NavContext";
import { CSVLink } from "react-csv";
const { RangePicker } = DatePicker;

const RevenueProjection = ({
  filter,
  getFilteredValue,
  showFilterModal,
  isFilterModalOpen,
  handleOk,
  handleCancel,
  applyFilters,
  renderCheckboxGroup,
  onChange,
  regionOptions,
  duOptions,
  selectedFilters,
  id,
  msa_id,
  onhandledatechange,
  filterStartDate,
  filterEndDate,
}: RevenueProjectionPropType) => {
  const revenueid = id ? id : undefined;
  const [type, setType] = useState<string>();
  const{revenueExcelData}=useContext(NavContexts);
  return (
    <div className={styles.revueneprojection}>
      <h2 className={styles.revueneprojection__title}>REVENUE PROJECTION</h2>
      <div>
        <Card
        className={styles.revueneprojection__card}
          title={
            <div>
              <ConfigProvider
                theme={{
                  token: {
                    borderRadius: 20,
                  },
                  components: {
                    Segmented: {
                      itemSelectedBg: "#DC143C",
                      itemSelectedColor: "#FFF",
                    },
                  },
                }}
              >
                <div className={styles.revueneprojection__card__filtersection}>
                  <Segmented<string>
                    options={["Monthly", "Quarterly", "Yearly"]}
                    defaultValue="Monthly"
                    size="middle"
                    onChange={(value) => {
                      setType(value);
                      getFilteredValue(value);
                    }}
                  />
                  {revenueid ? (
                    <></>
                  ) : (
                    <>
                      {type === "Quarterly" ? (
                        <>
                          <RangePicker
                            picker="quarter"
                            className={styles.revueneprojection__card__filtersection__datepicker}
                            onChange={onhandledatechange}
                          />
                        </>
                      ) : type === "Yearly" ? (
                        <>
                          <RangePicker
                            picker="year"
                            className={styles.revueneprojection__card__filtersection__datepicker}
                            onChange={onhandledatechange}
                          />
                        </>
                      ) : (
                        <>
                          <RangePicker
                            picker="month"
                            className={styles.revueneprojection__card__filtersection__datepicker}
                            onChange={onhandledatechange}
                          />
                        </>
                      )}

											<HiOutlineFilter
												className={styles.revueneprojection__card__filtersection__filtericon}
												size={20}
												onClick={showFilterModal}
											/>
                     <button className={`${styles.export}`}>
                      <CSVLink filename={`revenue.xlsx`} data={revenueExcelData} style={{ textDecoration: "none", color: "white" }}>
                        Export
                      </CSVLink>
                     </button>
										</>
									)}
										<Modal
											title="Revenue Filter"
											open={isFilterModalOpen}
											onOk={handleOk}
											onCancel={handleCancel}
											mask={false}
											className={styles.revueneprojection__card__filtersection__filtermodal}
											footer={null}
										>
											{renderCheckboxGroup("du", duOptions)}
											{renderCheckboxGroup("cType", ["FF", "TM"])}
										</Modal>
								</div>
							</ConfigProvider>
						</div>
					}
				>
					<div data-testid="line-chart">
					<LineChartHandler
						filter={filter}
						selectedFilters={selectedFilters}
						id={revenueid}
            msa_id={msa_id ? msa_id : undefined}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
					/></div>
				</Card>
			</div>
		</div>
	);
};

export default RevenueProjection;

import React, { useState } from "react";
import styles from "./RevenueProjection.module.css";
import { Card, ConfigProvider, Modal, Segmented } from "antd";
import { RevenueProjectionPropType } from "./types";
import LineChartHandler from "./LineChartHandler";
import { HiOutlineFilter } from "react-icons/hi";
import { DatePicker } from "antd";
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
  onhandledatechange,
  filterStartDate,
  filterEndDate,
}: RevenueProjectionPropType) => {
  const revenueid = id ? id : undefined;
  console.log(filter);
  const [type, setType] = useState<string>();

  return (
    <div className={styles.revueneProjection}>
      {/* <BreadCrumbs /> */}
      <h2 className={styles.revueneProjection__heading}>REVENUE PROJECTION</h2>
      <div>
        <Card
          style={{ width: "65rem" }}
          title={
            <div className={styles.cardTitle}>
              <ConfigProvider
                theme={{
                  token: {
                    borderRadius: 20,
                    // borderRadiusLG: 50,
                  },
                  components: {
                    Segmented: {
                      itemSelectedBg: "#DC143C",
                      itemSelectedColor: "#FFF",
                    },
                  },
                }}
              >
                <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
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
                            className={styles.rangepicker}
                            onChange={onhandledatechange}
                          />
                        </>
                      ) : type === "Yearly" ? (
                        <>
                          <RangePicker
                            picker="year"
                            className={styles.rangepicker}
                            onChange={onhandledatechange}
                          />
                        </>
                      ) : (
                        <>
                          <RangePicker
                            picker="month"
                            className={styles.rangepicker}
                            onChange={onhandledatechange}
                          />
                        </>
                      )}

											<HiOutlineFilter
												className={styles.filtericon}
												size={20}
												onClick={showFilterModal}
											/>
                     
										</>
									)}
									<div className={styles.filterModal}>
										<Modal
											title="Revenue Filter"
											open={isFilterModalOpen}
											onOk={handleOk}
											onCancel={handleCancel}
											mask={false}
											className={styles.filterModal}
											footer={null}
										>
											{renderCheckboxGroup("du", duOptions)}
											{/* {renderCheckboxGroup("region", regionOptions)} */}
											{renderCheckboxGroup("cType", ["FF", "TM"])}
										</Modal>
									</div>
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
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
					/></div>
				</Card>
			</div>
		</div>
	);
};

export default RevenueProjection;

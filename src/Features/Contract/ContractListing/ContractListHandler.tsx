import React, { useState, useEffect } from "react";
import { ArrowDownOutlined, ArrowUpOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Empty, Input, Tag, Tooltip } from "antd";
import { FilterConfirmProps, TablePaginationConfig} from "antd/lib/table/interface";
import { fetchDataFromApi } from "./api/AllContracts";
import { fetchMyContractsApi } from "./api/MyContracts";
import { ContractData, TableColumn, locale } from "./types";
import ContractList from "./ContractList";
import { useNavigate } from "react-router";
import tableStyles from "./ContractList.module.css";
import { useLocation } from "react-router";

const ContractListHandler = () => {
  const [data, setData] = useState<ContractData[]>([]);
  const [searchConditions, setSearchConditions] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isEmptySearch, setIsEmptySearch] = useState<boolean>(false);
  const [actionClicked, setActionClicked] = useState<boolean>(false);
  const [checkedExpiring, setCheckedExpiring] = useState(false);
  const [contractAddToast, setContractAddToast] = useState<boolean>(false);
  const [contractEditToast, setContractEditToast] = useState<boolean>(false);
  const [isMyContracts, setIsMyContracts] = useState<boolean>(false);
  const [slideroption, setSlideroption] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');
  const [sortField, setSortField] = useState<string>();
  const navigate = useNavigate();
  const location = useLocation();
  const ROLE_ID = parseInt(localStorage.getItem("role_id") || "0");  //get loged in users role
  const SCROLL =  {x: 'auto' } //table scroll for x axis
  const [pageTitle, setPageTitle] = useState(""); 
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10, // Default page size
    total: 0,
  });

  let locale: locale = {
    //empty message for table
    emptyText: loading ? " " : <Empty />,
  };
  const showExpired = (checked: boolean) => {
    //show expired contracts?
    setCheckedExpiring(checked);
    setPagination({ //set pagination to default
      current:  1,
      pageSize: 10,
      total: 0,
    });
    setSearchConditions({}); //clear search from Api
    setIsEmptySearch(true);
    setSortField('');
  };
  const handleSegmentChange = (value: string) => { //function to handle segment slider
    if(value==='All'){
      setSlideroption('');
      clearSearch();
    }
    else if(value==='Associated'){
      setSlideroption('associated_by_me');
      clearSearch();
    }
    else{
      setSlideroption('added_by_me');
      clearSearch();
    }
  };
  const handleTableChange = (pagination: TablePaginationConfig) => { //pagination handle
    if ("current" in pagination && "pageSize" in pagination) {
      setPagination({
        current: pagination.current || 1,
        pageSize: pagination.pageSize || 10,
        total: pagination.total || 0,
      });
    }
  };
  const onSearch = (selectedKeys: string, selectedField: string) => {
    setIsEmptySearch(false);
    setSearchConditions((prevConditions) => ({
      ...prevConditions,
      [selectedField]: selectedKeys,
    }));
  };

  const clearSearch = () => {
    setSearchConditions({});
    setIsEmptySearch(true);
  };

  const rowClassName = (record: ContractData, index: number): string => {
    // Add a custom class to alternate rows
    return index % 2 === 0 ? tableStyles["oddRow"] : tableStyles["evenRow"];
  };
//click function for each data row
  const rowClickHandler = (record: ContractData) => {
    if (!actionClicked) {
      navigate(`${record.contract_ref_id}`, {
        state: { id: record.id as string },
      });
    }
  };

  const handleSort = (key:string) => {
    if (sortField === key){
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      setSortField(key);
      
    }
    else{
      setSortField(key);
      setSortOrder('asc');
    }
    clearSearch();
  }

  useEffect(() => {
    setSearchConditions({}); //clear search and search entry
    setIsEmptySearch(true);
    setPagination({ //set pagination to default
        current:  1,
        pageSize: 10,
        total: 0,
      });
      setSortField('');
   // setCheckedExpiring(false); //set check expiring off by default
  }, [window.location.href]);

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, [
    searchConditions,
    pagination.current,
    pagination.pageSize,
  ]); // Refetch data when searchText or searchField changes

  useEffect(() => {
    //get values from navigation to show props
    if (location.state && location.state.hasOwnProperty("added")) {
      setContractAddToast(true);
      setTimeout(() => {
        window.history.replaceState(null, "");
      }, 0);
    } else if (location.state && location.state.hasOwnProperty("edited")) {
      setContractEditToast(true);
      setTimeout(() => {
        window.history.replaceState(null, "");
      }, 0);
    }
  }, [location.state]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let location = window.location.href; //get the url path
      let locationPaths = location.split("/");
      let pagePath = locationPaths[locationPaths.length - 1]; //get the corresponding page path.
      //get Api for MyContracts
      if (pagePath === "MyContracts") {
        const USER_ID = localStorage.getItem("user_id") as string; //get user id
        setIsMyContracts(true);
        const result = await fetchMyContractsApi(
          searchConditions,
          pagination.current,
          pagination.pageSize,
          USER_ID,
          checkedExpiring,
          slideroption,
          sortField,
          sortOrder
        );
        setData(result.data);
        setPageTitle("MY CONTRACTS"); //dynamic page title
        setPagination({
          ...pagination,
          total: result.total,
        });
      } else {
        //get Api for All contracts
        setIsMyContracts(false);
        const result = await fetchDataFromApi(
          searchConditions,
          pagination.current,
          pagination.pageSize,
          checkedExpiring,
          sortField,
          sortOrder
        );
        setData(result.data);
        setPageTitle("CONTRACTS OVERVIEW");
        setPagination({
          ...pagination,
          total: result.total,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  //search button components for each title
  const getColumnSearchProps = (dataIndex: string) => {
    return {
      filterDropdown: ({
        selectedKeys,
        confirm,
        setSelectedKeys,
      }: {
        selectedKeys: React.Key[];
        confirm: (param?: FilterConfirmProps) => void;
        setSelectedKeys: (selectedKeys: React.Key[]) => void;
      }) => {
        return (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
              placeholder={`Search ${
                (customHeadings as Record<string, string>)[dataIndex]
              }`}
              onChange={(e) => {
                setSelectedKeys([e.target.value]);
                onSearch(e.target.value, dataIndex);
              }}
              value={isEmptySearch ? "" : selectedKeys[0]}
              style={{
                marginBottom: 8,
                display: "block",
              }}
            />
            <Button
              onClick={() => {
                clearSearch();
              }}
            >
              Clear All Search
            </Button>
          </div>
        );
      },
      filterIcon: () => <SearchOutlined />,
    };
  };
 //custom headings for selected data
  const customHeadings: Record<string, string> = {
    contract_ref_id: "Contract ID",
    client_name: "Client Name",
    start_date: "Start Date",
    end_date: "End Date",
    contract_type: " Type",
    contract_status: "Status",
    du: "DU",
  };
  const desiredColumnKeys = [
    "contract_ref_id",
    "client_name",
    "start_date",
    "end_date",
    "contract_type",
    "du",
  ];
 
//map the data selected corresponding title
  const columns: TableColumn[] = desiredColumnKeys.map((key) => ({
    title: (
      <div onClick={() => handleSort(key)}>
        <Tooltip title="Click to sort">
        {customHeadings[key]} 
        <ArrowUpOutlined style={{ marginLeft: '5px' ,width:'12px', height:'12px'}} title="Ascending sort" className={sortOrder === 'asc' && sortField === key ? tableStyles['activeSort'] : ''}/>  
        <ArrowDownOutlined style={{ marginLeft: '1px' ,width:'12px', height:'12px' }} title="Descending sort" className={sortOrder === 'desc' && sortField === key ? tableStyles['activeSort'] : ''}/>
        </Tooltip>
      </div>
    ),
    dataIndex: key,
    key,
     // Enable sorter for the column
    
    ...getColumnSearchProps(key),
    render: (text: any, record: ContractData) => (
      <span onClick={() => rowClickHandler(record)}>{text}</span>
    ),
  }));

  const oneditPage = (contract_id: string) => { //edit button click
    setActionClicked(true);
    navigate(`Edit Contract`, {
      state: { id: contract_id as string },
    });
  };

  columns.push({ //add status row to columns
    title: (
      <div onClick={() => handleSort('contract_status')}>
        {'Status'}
        <ArrowUpOutlined style={{ marginLeft: '5px' ,width:'12px', height:'12px'}} title="Ascending sort" className={sortOrder === 'asc' && sortField === 'contract_status' ? tableStyles['activeSort'] : ''}/>
        <ArrowDownOutlined style={{ marginLeft: '1px' ,width:'12px', height:'12px'}} title="Descending sort" className={sortOrder === 'desc' && sortField === 'contract_status' ? tableStyles['activeSort'] : ''}/>
      </div>
    ),
    dataIndex: "contract_status",
    key: "contract_status",
   
    ...getColumnSearchProps("contract_status"),
    render: (status: string, record: ContractData) => {
      let className = "status-active"; //default style
      if (status === "On Progress") {
        className = "status-onprogress";
      } else if (status === "Closed") {
        className = "status-closed";
      } else if (status === "Expired") {
        className = "status-closed";
      }else if (status === "Expiring") {
        className = "status-Expiring";
      }
      return (
        <Tag
          className={className}
          onClick={() => {
            rowClickHandler(record);
          }} >
          {status}
        </Tag>
      );
    },
  });
  {
    ROLE_ID !== 3 &&
      columns.push({
        title: (
          <div>
            {"Action"}
          </div>
        ),
        key: "action",
        render: (text: any, record: ContractData) => (
          <span>
            <EditOutlined
              style={{ fontSize: "16px", color: "#DC143C" }}
              onClick={() => {
                oneditPage(record.id);
              }}
            />
          </span>
        ),
      });
  }

  return (
    <>
      <ContractList
        columns={columns}
        data={data}
        pagination={pagination}
        handleTableChange={handleTableChange}
        actionClicked={actionClicked}
        loading={loading}
        rowClassName={rowClassName}
        pageTitle={pageTitle}
        locale={locale}
        showExpired={showExpired}
        contractAddToast={contractAddToast}
        contractEditToast={contractEditToast}
        isMyContracts={isMyContracts}
        handleSegmentChange={handleSegmentChange}
        navigate={navigate}
        ROLE_ID={ROLE_ID}
        SCROLL={SCROLL}
      />
    </>
  );
};
export default ContractListHandler;

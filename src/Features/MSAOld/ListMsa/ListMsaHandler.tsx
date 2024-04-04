import React, { useContext, useEffect, useState } from 'react'
import ListMsa from './ListMsa'
import { MsaData, TableColumn } from './types';
import { Button, Input} from 'antd';
import { CloudDownloadOutlined, EditOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { getapi } from './api/getapi';
import { TablePaginationConfig } from 'antd/lib';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { useLocation, useNavigate } from 'react-router';
import { getapi_inactivemsa } from './api/getapi_inactivemsa';
import tableStyles from './ListMsa.module.css'  ; 
import { NavContexts } from '../../../Components/NavContext/NavContext';


const ListMsaHandler = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const{setAdded,added,setEdited,edited,setRenew,renew}=useContext(NavContexts);
  const [data, setData] = useState<MsaData[]>([]);
  const [isEmptySearch, setIsEmptySearch] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchConditions, setSearchConditions] = useState<Record<string,string>>({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10, 
    total: 0, 
  });
  const [actionClicked, setActionClicked]= useState<boolean>(false);
  const[isActive,setIsActive]=useState<boolean>(true);
  const customHeadings:Record<string, string> = {
    'msa_ref_id': 'MSA ID',
    'client_name': 'Client Name',
    'start_date': 'Start Date',
    'end_date': 'End Date',
    'added_by_user': ' Added By'
  };

  const ROLE_ID = parseInt(localStorage.getItem('role_id') || '0', 10); 
  // useEffect to handle changes in location state
  useEffect(() => {
    if (location.state) {
      // Check if MSA was added
      if (location.state.added) {
        setAdded(true);
        console.log(added);
      }
      // Check if MSA was edited
      else if (location.state.edited) {
       setEdited(true);
    }
    // Check if MSA was renew
    else if (location.state.renew){
      setRenew(true)
    }
        setTimeout(() => {
          window.history.replaceState(null, '');
      }, 0);
    }
}, [location.state]); 

  // Fetch data based on search conditions, pagination, and isActive status
  useEffect(() => {
    if(isActive){
      // Fetch data based on search conditions and pagination
    fetchData();
    }else{
      // If component is inactive, show inactive MSA
      setActionClicked(true)
      showInactiveMSA();
    }
  }, [searchConditions,pagination.current, pagination.pageSize]);
  // Function to fetch data based on search conditions, pagination, and page size
  const fetchData = async () => {
    try {
      setActionClicked(false);
      // Fetch data from API
      const response = await getapi(pagination.current, pagination.pageSize,searchConditions);
      setLoading(false);
       // Set fetched data and update pagination
      setData(response.data);
      setPagination({
        ...pagination,
        total: response.total,
      });

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Function to fetch inactive MSA data
const showInactiveMSA=async()=>{
  try {
    // Set active flag to false and action clicked flag to true
    setIsActive(false);
    setActionClicked(true);
    // Fetch inactive MSA data from API
    const inactiveresponse= await getapi_inactivemsa(pagination.current, pagination.pageSize,searchConditions);
    console.log(inactiveresponse)
    setData(inactiveresponse);
    console.log("inactive response",inactiveresponse)
    setPagination({
      ...pagination,
      total: inactiveresponse.total,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// Function to handle pagination and page size change in the table
  const handleTableChange = (pagination: TablePaginationConfig) => {
    if ('current' in pagination && 'pageSize' in pagination) {
      setPagination({
        current: pagination.current || 1,
        pageSize: pagination.pageSize || 10,
        total: pagination.total || 0,
      });
    }
  
  };
  // Function to apply custom row class names for alternate rows
  const rowClassName = (record:MsaData, index: number): string => {
    return index % 2 === 0 ? tableStyles['oddRow'] : tableStyles['evenRow'];
  };
  // Array of desired column keys to be displayed in the table
  const desiredColumnKeys = ['msa_ref_id', 'client_name', 'start_date', 'end_date'];
  // Function to get search properties for a specific column
  const getColumnSearchProps = (dataIndex: string) => {
    return{
    filterDropdown: ({ selectedKeys,confirm, setSelectedKeys}: { selectedKeys: React.Key[]; confirm: (param?: FilterConfirmProps) => void;setSelectedKeys: (selectedKeys: React.Key[]) => void;}) => { 
      // Custom filter dropdown content based on the column
      if (dataIndex === 'msa_ref_id') {
                return null;
    }

      return (<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          placeholder={`Search ${(customHeadings as Record<string, string>)[dataIndex]}`}
          onChange={(e) => { setSelectedKeys([e.target.value]);onSearch(e.target.value, dataIndex)}}
          value={isEmptySearch?"":selectedKeys[0]}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Button onClick={() => {
          clearSearch();          
              }}>Clear All Search</Button>
      </div>
      )
    },
    filterIcon: (filtered:boolean) => {
      // Display filter icon based on the column
      if(dataIndex==='msa_ref_id'){
         return null;
      }
      return <SearchOutlined/>
    },
    };
  };
  // Function to handle search for a specific column
    const onSearch = ( selectedKeys: string, selectedField: string) => {
      setIsEmptySearch(false); 
      setSearchConditions((prevConditions) => ({...prevConditions, [selectedField]: selectedKeys }));
      // Update search conditions with the selected keys and field
      console.log(searchConditions);
    };
    // Function to clear search conditions and reset search flag
    const clearSearch = ( ) => {
      setSearchConditions({});
      setIsEmptySearch(true);    
    };
    // Function to navigate to the edit MSA page with the provided MSA reference ID
    const oneditPage = (msa_ref_id: string) => {
      setActionClicked(true);
      navigate(`/MSAOverview/Edit MSA`, {
        state: { msa_ref_id: msa_ref_id as string },
      });
    };
    // Function to navigate to the renew MSA page with the given MSA reference ID
    const onrenewPage = (msa_ref_id: string) => {
      setActionClicked(true);
      navigate(`/MSAOverview/Renew MSA`, {
        state: { msa_ref_id: msa_ref_id as string },
      });
    };
  // Array to hold table column configurations
  const columns: TableColumn[] = desiredColumnKeys.map((key) => ({
    title: customHeadings[key],
    dataIndex: key,
    key,
    sorter: key === 'msa_ref_id' ? false : (a: MsaData, b: MsaData) => (a[key as keyof MsaData]).localeCompare(b[key as keyof MsaData]),
    sortDirections: ['ascend', 'descend'],
    ...getColumnSearchProps(key),
  }));
  // Add action column conditionally based on ROLE_ID
  {   ROLE_ID !==3 &&
    columns.push({
     title: 'Action',
     key: 'action',
     // Render function to display action icons
     render: (text:any, record:MsaData) => (
      <div className='listmsa-action-icons'>
      <span className='listmsa-action-renew'>
        <SyncOutlined
        title='Renew MSA'
        className='listmsa-action-renew'
        style={{ fontSize: '16px', color: '#DC143C' ,paddingRight:"10px" }}
        onClick={() => {
          onrenewPage(record.msa_ref_id);
        }}/>
      </span>
      
       <span className='listmsa-action-edit'>
        {actionClicked?<></>:
         <EditOutlined
         title='Edit MSA'
         className='listmsa-action-edit-icon'
           style={{ fontSize: '18px', color: '#DC143C' ,paddingRight:"10px" }}
           onClick={() => {
             oneditPage(record.msa_ref_id);
           }}
         />}
       </span>
       <span>
        <a href={record.msa_doclink}>
       <CloudDownloadOutlined
       title='Download MSA'
                  style={{ fontSize: '18px', color: '#DC143C',paddingRight:"5px" }}
                 />
        </a>
       </span>
       
       </div>
     ),
   });
  }
  // Function to determine row class name for alternate row styling
   const getRowClassName = (record: any, index: number) => {
    return index % 2 === 0 ? 'even-row' : 'odd-row';
  };
  return (
   <ListMsa
   handleTableChange={handleTableChange}
   columns={columns}
   pagination={pagination}
   getRowClassName={getRowClassName}
   data={data}
    msaAdded={added}
    edited={edited}
    fetchData={fetchData}
    showInactiveMSA={showInactiveMSA}
    rowClassName={rowClassName}
    renew={renew}
    loading={loading}
   />
  )
  }

export default ListMsaHandler

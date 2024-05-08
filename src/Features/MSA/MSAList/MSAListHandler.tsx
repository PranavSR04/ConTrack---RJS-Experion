import { useContext, useEffect, useState } from "react";
import { MsaData, TableColumn, locale } from "./types";
import { getmsalist } from "./api/getmsalist";
import { Button, Empty, Input, Pagination, TablePaginationConfig, Tooltip} from "antd";
import tableStyles from './MSAList.module.css'
import { ArrowDownOutlined, ArrowUpOutlined, CloudDownloadOutlined, EditOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { FilterConfirmProps } from "antd/es/table/interface";
import MSAList from "./MSAList";
import { useLocation, useNavigate } from "react-router";
import { NavContexts } from "../../../Components/NavContext/NavContext";

const MSAListHandler = () => {
    const location = useLocation();
    const ROLE_ID = parseInt(localStorage.getItem("role_id") || "0", 10);
    const{setAdded,added,setEdited,edited,setRenew,renew}=useContext(NavContexts);
    const [data, setData] = useState<MsaData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const customHeadings:Record<string, string> = {
        'msa_ref_id': 'MSA ID',
        'client_name': 'Client Name',
        'start_date': 'Start Date',
        'end_date': 'End Date',
        'added_by_user': ' Added By'
      };
      const [searchConditions, setSearchConditions] = useState<Record<string,string>>({});
      const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10, 
        total: 0, 
      });
      const [actionClicked, setActionClicked]= useState<boolean>(false);
      const [isEmptySearch, setIsEmptySearch] = useState(false);
      // const [added, setAdded] = useState(false);
      // const[edited,setEdited]=useState(false);
      // const[renew,setRenew]=useState(false);    
      const [selectedActiveKeys, setSelectedActiveKeys] = useState("");
      const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');
      const [sortField, setSortField] = useState<string>();

      let locale: locale = {
        //empty message for table
        emptyText: loading ? " " : <Empty />,
      };
      //click function for each data row
      const rowClickHandler = (record: MsaData) => {
        navigate(`/${record.msa_ref_id}`, {
            state: { id: record.id as string },
          });
      };

      useEffect(() => {
        
        if (location.state) {
          // Check if MSA was added
          if (location.state.added) {
            setAdded(true);
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
    fetchData();
  },[searchConditions,pagination.current, pagination.pageSize]);


    // Function to fetch data based on search conditions, pagination, and page size
    const fetchData = async () => {
        try {
          setActionClicked(false);
          // Fetch data from API
          const response = await getmsalist(
            pagination.current,
             pagination.pageSize,
             searchConditions,
             sortField,
             sortOrder);
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


      const handleAddMSA=()=>{
        navigate("/MSAForm", { state: { msaAdded: true } })
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
  // Function to apply custom row class names for alternate rows
  const rowClassName = (record:MsaData, index: number): string => {
    return index % 2 === 0 ? tableStyles['oddRow'] : tableStyles['evenRow'];
  };
    // Array of desired column keys to be displayed in the table
    const desiredColumnKeys = ['msa_ref_id', 'client_name', 'start_date', 'end_date'];
    // Function to get search properties for a specific column
    const getColumnSearchProps = (dataIndex: string) => {
      return{
      filterDropdown: ({ selectedKeys,confirm, setSelectedKeys}: 
        { selectedKeys: React.Key[]; confirm: (param?: FilterConfirmProps) => void;setSelectedKeys: (selectedKeys: React.Key[]) => void;}) => { 
        // Custom filter dropdown content based on the column
  
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
        return <SearchOutlined/>
      },
      };
    };

    //click function for each data row
  // const rowClickHandler = (record: MsaData) => {
  //   if (!actionClicked) {
  //     navigate(`${record.msa_ref_id}`, {
  //       state: { id: record.id as string },
  //     });
  //   }
  // };

    const handleActiveMSA=()=>{
        if(selectedActiveKeys=='Inactive'){
            setSearchConditions((prevConditions) => ({...prevConditions, ['is_active']: '1'}));
         }
         else {
            setSearchConditions((prevConditions) => ({...prevConditions, ['is_active']: '0'}));
         }
    }
    const handleSegmentChange = (value: string) => {
        setSelectedActiveKeys(value); // Update the selectedKeys state with the value of the selected segment
        handleActiveMSA();

    };

    // Function to handle search for a specific column
      const onSearch = ( selectedKeys: string, selectedField: string) => {
        setIsEmptySearch(false); 
          // Determine the search condition based on selectedActiveKeys
        setSearchConditions((prevConditions) => ({...prevConditions, [selectedField]: selectedKeys }));
        // Update search conditions with the selected keys and field
        console.log(searchConditions);
      };
          // Function to clear search conditions and reset search flag
    const clearSearch = ( ) => {
        setSearchConditions({});
        setIsEmptySearch(true);    
      };
      const oneditPage = (id: string) => {
        navigate('/MSAForm', { state: {id:id as string , msaEdited: true } });
       
      };
      const onRenewPage=(id:string)=>{
        navigate("/MSAForm", { state: {id:id as string , msaRenewed: true } });
       
      }
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
    render: (text: any, record: MsaData) => (
      <span onClick={() => rowClickHandler(record)}>{text}</span>
    ),
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
            onClick={()=>{
              onRenewPage(record.id)
            }}
           />
          </span>
          
           <span className='listmsa-action-edit'>
           <Tooltip title="Edit MSA"/>
            {actionClicked?<></>:
             <EditOutlined
             title='Edit MSA'
             className='listmsa-action-edit-icon'
               style={{ fontSize: '18px', color: '#DC143C' ,paddingRight:"10px" }}
               onClick={() => {
                oneditPage(record.id);
              }}
             />}
           </span>
           <span>
            <a 
            style={{textDecoration:'none'}}
            href={record.msa_doclink}>
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
    <MSAList
    handleTableChange={handleTableChange}
   columns={columns}
   pagination={pagination}
   getRowClassName={getRowClassName}
   data={data}
   locale={locale}
    fetchData={fetchData}
    rowClassName={rowClassName}
    loading={loading}
    handleSegmentChange={handleSegmentChange}
    handleAddMSA={handleAddMSA}
    msaAdded={added}
    edited={edited}
    renew={renew}
    />
  )
}

export default MSAListHandler

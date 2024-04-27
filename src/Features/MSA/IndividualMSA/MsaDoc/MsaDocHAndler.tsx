// import { useState, useEffect } from 'react';
// import { Avatar, Card, List } from 'antd';
// import { MsaDocPropType } from './types';
// import { MsaDocs } from '../types';
// import { DownloadOutlined } from '@ant-design/icons';
// import styles from './MsaDoc.module.css'

// const MsaDocHandler = ({ response }: MsaDocPropType) => {
//   const [data, setData] = useState<MsaDocs[]>([]);

//   useEffect(() => {
//     if (response && response.data && response.data.length > 0) {
//       setData(response.data[0].combined_msa_doclink);
//     }
//   }, [response]);

//   return (
//     <Card className={styles['listContainer']}>
//    <b> <p>MSA Document History</p></b>
//     <List
//       itemLayout="horizontal"
//       dataSource={data}
//       renderItem={(item, index) => (
//         <List.Item>
//         <List.Item.Meta
//   avatar={<a href={item.msa_doclink}><Avatar icon={<DownloadOutlined />} /></a>}
//   title={(
//     <div>
//       <a style={{ textDecoration: 'none' }} href={item.msa_doclink || ''}>
//         {`Start Date: ${item.start_date || ''} - End Date: ${item.end_date || ''}`}
//       </a>
//     </div>
//   )}
// />

//         </List.Item>
//       )}
//     />
//     </Card>
//   );
// };

// export default MsaDocHandler;

import { useState, useEffect } from 'react';
import { Avatar, Card, List } from 'antd';
import { MsaDocPropType } from './types';
import { MsaDocs } from '../types';
import { FilePdfOutlined } from '@ant-design/icons'; // Import a more modern icon
import styles from './MsaDoc.module.css';

const MsaDocHandler = ({ response }: MsaDocPropType) => {
  const [data, setData] = useState<MsaDocs[]>([]);

  useEffect(() => {
    if (response && response.data && response.data.length > 0) {
      setData(response.data[0].combined_msa_doclink);
    }
  }, [response]);

  return (
    <Card className={styles.listContainer}>
      <h2 className={styles.title}>Document History</h2>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item className={styles.listItem}>
            <List.Item.Meta
              avatar={<a href={item.msa_doclink}><Avatar icon={<FilePdfOutlined />} className={styles.avatar} /></a>}
              title={(
                <a style={{ textDecoration: 'none' }} href={item.msa_doclink || ''}>
                  {`${item.start_date || ''} -  ${item.end_date || ''}`}
                </a>
              )}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default MsaDocHandler;


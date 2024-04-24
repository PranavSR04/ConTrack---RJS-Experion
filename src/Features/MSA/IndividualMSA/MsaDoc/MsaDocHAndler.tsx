import { useState, useEffect } from 'react';
import { Avatar, Card, List } from 'antd';
import { MsaDocPropType } from './types';
import { MsaDocs } from '../types';
import { DownloadOutlined } from '@ant-design/icons';
import styles from './MsaDoc.module.css'

const MsaDocHandler = ({ response }: MsaDocPropType) => {
  const [data, setData] = useState<MsaDocs[]>([]);

  useEffect(() => {
    if (response && response.data && response.data.length > 0) {
      setData(response.data[0].combined_msa_doclink);
    }
  }, [response]);

  return (
    <Card className={styles['listContainer']}>
   <b> <p>MSA Document History</p></b>
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
             avatar={<a href={item.msa_doclink }><Avatar icon={<DownloadOutlined />} /></a>} 
             title={<a style={{ textDecoration: 'none' }} href={item.msa_doclink || ''}>{`Start Date: ${item.start_date || ''}`}</a>}
            description={<a style={{ textDecoration: 'none' }} href={item.msa_doclink || ''}>{`End Date: ${item.end_date || ''}`}</a>}
          />
        </List.Item>
      )}
    />
    </Card>
  );
};

export default MsaDocHandler;

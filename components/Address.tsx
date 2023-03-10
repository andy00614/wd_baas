import { Avatar, List, ListProps } from "antd";
import dayjs from 'dayjs'
import styles from '@/styles/List.module.scss'


export interface Address {
  list: {
    address: string;
    time: Date;
  }[],
  loading?: boolean
}
const Address: React.FC<Address> = (props) => {
  return <List
    loading={props.loading}
    style={{height: '340px', overflow: 'auto'}}
    className={styles.listWrapper}
    itemLayout="horizontal"
    dataSource={props.list}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="/crypto.png" />}
          title={<a href="#">{item.address}</a>}
          description={dayjs(item.time).format('YYYY-MM-DD HH:MM:ss')}
        />
      </List.Item>
    )}
  />
}

export default Address

import React from 'react'
import { CommentsPropType } from './types'
import { Card } from 'antd'
import styles from './MsaComments.module.css'
const MsaComments = ({
    comments,
}:CommentsPropType) => {
  return (
    <div>
       <Card
          className={styles.maincontainer__docusercomm__payment}
        >
          <div className={styles.maincontainer__docusercomm__title}>
            <h4>Comments</h4>
          </div>
          <div className={styles.maincontainer__docusercomm__list}>
            {comments}
          </div>
        </Card>
    </div>
  )
}

export default MsaComments

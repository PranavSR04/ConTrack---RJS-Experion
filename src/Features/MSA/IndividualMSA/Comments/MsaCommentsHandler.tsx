import React, { useEffect, useState } from "react";
import MsaComments from "./MsaComments";
import { HandlerPropType } from "../OverView/types";
import { CommentsHandlerType } from "./types";
const MsaCommentsHandler = (
    {
        responses,
        loading,
      }: HandlerPropType
) => {
//   const [msaRefId, setMsaRefId] = useState<string>("");
//   const [clientName, setClientName] = useState<string>("");
  const [comments, setComments] = useState<string>("")
  useEffect(() => {
    console.log("response in Header Handler", responses);
    getComments(responses);
  }, [responses]);
  const getComments: CommentsHandlerType["getComments"] =
    (responses) => {
      if (responses && responses.data && responses.data.length > 0) {
        // setClientName(responses.data[0].client_name);
        // setMsaRefId(responses.data[0].msa_ref_id);
        setComments(responses.data[0].comments)
      }
    };
  return (
    <div>
       <MsaComments
        comments={comments}
      />
    </div>
  )
}

export default MsaCommentsHandler

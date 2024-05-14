import React, { useEffect, useState } from "react";
import { HandlerPropType } from "../Header/types";
import DocumentsUsersComments from "./DocumentsUsersComments";
import { AssociatedGroupsType, AssociatedUsersType, DocumentsUsersCommentsHandlerType } from "./types";
import { Addendum } from "../types";

const DocumentsUsersCommentsHandler = ({
  responses,
  loading,
}: HandlerPropType) => {
  const [contractDocuments, setContractDocuments] = useState<string>("");
  const [contractRefId, setContractRefId] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [addendums, setAddendums] = useState<Addendum[]>([]);
  const [comments, setComments] = useState<string>("")
  const [associatedUsers, setAssociatedUsers] = useState<AssociatedUsersType[]>([]);
  const [associatedGroups, setAssociatedGroups] = useState<AssociatedGroupsType[]>([]);

  useEffect(() => {
    console.log("response in Header Handler", responses);
    getContractDocuments(responses);
  }, [responses]);

  // Function which is used to set the data required from response
  const getContractDocuments: DocumentsUsersCommentsHandlerType["getContractDocuments"] =
    (responses) => {
      if (responses && responses.data && responses.data.length > 0) {
        setContractDocuments(responses.data[0].contract_doclink);
        setClientName(responses.data[0].client_name);
        setContractRefId(responses.data[0].contract_ref_id);
        setAddendums(responses.data[0].addendum);
        setComments(responses.data[0].comments)
        setAssociatedUsers(responses.data[0].associated_users);
        setAssociatedGroups(responses.data[0].associated_groups)
      }
    };
  return (
    <>
      <DocumentsUsersComments
        loading={loading}
        contractDocuments={contractDocuments}
        contractRefId={contractRefId}
        clientName={clientName}
        addendums={addendums}
        comments={comments}
        associatedUsers={associatedUsers}
        associatedGroups={associatedGroups}
      />
    </>
  );
};

export default DocumentsUsersCommentsHandler;

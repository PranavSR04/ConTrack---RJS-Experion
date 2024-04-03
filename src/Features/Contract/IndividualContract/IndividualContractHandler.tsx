import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import IndividualContract from "./IndividualContract";
import { getContractData } from "./api/getContractData";
import { ContractApiType, LocationStateProps } from "./types";
import { AxiosError } from "axios";

const IndividualContractHandler = () => {
  const location = useLocation();
  const { state } = location;
  const id = state?.id;
  const [responses, setResponses] = useState<
    ContractApiType | AxiosError<unknown, any>
  >();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (contractId: string) => {
      try {
        const response = await getContractData(contractId);
        setResponses(response);
        setLoading(false);
        console.log("Contracts response: ", response);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <>
      <IndividualContract id={id} responses={responses} loading={loading} />
    </>
  );
};

export default IndividualContractHandler;

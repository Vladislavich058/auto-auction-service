import { Spinner } from "@material-tailwind/react";
import LotService from "API/LotService";
import ManagerService from "API/ManagerService";
import LotTable from "components/LotTable";
import MyAlert from "components/UI/Alert/MyAlert";
import { useFetching } from "hooks/useFetching";
import { useLots } from "hooks/UseLots";
import React, { useEffect, useState } from "react";

const Lots = ({ type = "" }) => {
  const [lots, setLots] = useState([]);
  const [filter, setFilter] = useState({
    sort: { value: "", type: "" },
    query: "",
    filter: "",
  });

  const sortedAndSearchAndFilterLots = useLots(
    lots,
    filter.sort,
    filter.query,
    filter.filter
  );

  const [fetchLots, isLotsLoading, lotsError, lotsErrorOpen, setLotsErrorOpen] =
    useFetching(async () => {
      if (type === "manager") {
        const response = await ManagerService.getLots();
        setLots(response.data);
      } else if (type === "admin") {
        const response = await LotService.getAllLots();
        setLots(response.data);
      } else {
        const response = await LotService.getAllValidatedLots();
        setLots(response.data);
      }
    });

  useEffect(() => {
    fetchLots();
  }, [type]);

  return (
    <div className="py-10">
      <MyAlert
        type="error"
        open={lotsErrorOpen}
        // @ts-ignore
        onClose={() => setLotsErrorOpen(false)}
      >
        {lotsError}
      </MyAlert>
      {isLotsLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : (
        <div>
          <LotTable
            sortedAndSearchAndFilterLots={sortedAndSearchAndFilterLots}
            filter={filter}
            setFilter={setFilter}
            type={type}
          />
        </div>
      )}
    </div>
  );
};

export default Lots;

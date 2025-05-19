import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";
import Handsontable from "handsontable/base";
import { registerAllModules } from "handsontable/registry";
import { HotTable } from "@handsontable/react-wrapper";

registerAllModules();

const DataGrid = () => {
  return (
    <div class="ht-theme-main-dark-auto">
      <HotTable
        data={Array.from({length: 100}, () => Array.from({ length: 26}))}
        rowHeaders={true}
        colHeaders={true}
        width="100vw"
        height="100vh"
        autoWrapRow={true}
        autoWrapCol={true}
        colWidths={100}
        manualColumnResize
        licenseKey="non-commercial-and-evaluation" // for non-commercial use only
      />
    </div>
  );
};

export default DataGrid;

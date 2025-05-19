import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";
import Handsontable from "handsontable/base";
import { registerAllModules } from "handsontable/registry";
import { HyperFormula } from 'hyperformula';
import { HotTable } from "@handsontable/react-wrapper";

registerAllModules();
const hyperformulaInstance = HyperFormula.buildEmpty({
    // initialize it with the `'internal-use-in-handsontable'` license key
    licenseKey: 'internal-use-in-handsontable',
  });

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
        formulas={{
            engine: HyperFormula,
            // [plugin configuration]
          }}
      />
    </div>
  );
};

export default DataGrid;

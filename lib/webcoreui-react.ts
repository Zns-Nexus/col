import Accordion from "../node_modules/webcoreui/components/Accordion/Accordion.tsx";
import Alert from "../node_modules/webcoreui/components/Alert/Alert.tsx";
import Button from "../node_modules/webcoreui/components/Button/Button.tsx";
import DataTable from "../node_modules/webcoreui/components/DataTable/DataTable.tsx";

/**
 * Narrow entry for the webcoreui preview stories. The package's `webcoreui/react`
 * barrel re-exports every component including one (Stepper) whose shipped source
 * has a type error (`string | number` assigned to `dangerouslySetInnerHTML.__html`),
 * which fails `tsc` inside node_modules. The package's exports map blocks deep
 * imports, so this wrapper re-exports just the components the stories use from
 * their raw sources instead.
 */
export { Accordion, Alert, Button, DataTable };

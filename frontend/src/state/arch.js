import archs from '../arch';

let selected_arch = undefined;

export default function currentArch() {
    if (selected_arch === undefined) {
        for (const arch of archs) {
            if (arch.frontend === window.location.origin) {
                selected_arch = arch;
                return selected_arch;
            }
        }
        // not found, get from REACT_APP_BACKEND
        for (const arch of archs) {
            if (arch.code === process.env.REACT_APP_BACKEND) {
                selected_arch = arch;
                return selected_arch;
            }
        }
        throw new Error("The backend architecture could not be determined either from the URL nor from REACT_APP_BACKEND.");
    }
    return selected_arch;
}

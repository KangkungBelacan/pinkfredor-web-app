import { Route } from "react-router"
import * as PlaygroundSubPages from "./PlaygroundSubPages"
const Playground = () => {
    return <div>
        <Route path="/playground/Page" component={PlaygroundSubPages.Page} />
    </div>
};

export default Playground;
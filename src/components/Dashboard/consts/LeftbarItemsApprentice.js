import { Dashboard, QuestionAnswer, School, Streetview, TrackChanges} from "@mui/icons-material";
import { blue } from '@mui/material/colors';


export const leftbarItemsApprentice = [
    {
        id: 0,
        icon: <Dashboard sx={{ color: "white" }}/>,
        label: 'Dashboard',
        value: 'Dashboard',
        route: 'app/dashboard',
    },{
        id: 1,
        icon: <School sx={{ color: "white" }}/>,
        label: 'Batch',
        value: 'Batches',
        route: 'app/batches',
    },{
        id: 2,
        icon: <TrackChanges sx={{ color: "white" }}/>,
        label: 'Daily Status',
        value: 'DailyStatus',
        route: 'app/dailyStatus',
    },{
        id: 3,
        icon: <QuestionAnswer sx={{ color: "white" }}/>,
        label: 'F.A.Q',
        value: 'Faq',
        route: 'app/faq',
    },
];
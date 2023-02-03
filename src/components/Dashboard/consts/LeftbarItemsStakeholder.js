import { Assignment, ContentPasteSearch, Dashboard, Groups2,QuestionAnswer} from "@mui/icons-material";


export const leftbarItemsStakeholder = [
    {
        id: 0,
        icon: <Dashboard sx={{ color: "white" }}/>,
        label: 'Dashboard',
        value: 'Dashboard',
        route: 'app/stakeholder/dashboard',
    },{
        id: 1,
        icon: <Assignment sx={{ color: "white" }}/>,
        label: 'Assignments',
        value: 'Assignments',
        route: 'app/stakeholder/assignments',
    },{
        id: 2,
        icon: <ContentPasteSearch sx={{ color: "white" }}/>,
        label: 'My Tickets',
        value: 'Tickets',
        route: 'app/stakeholder/tasks',
    },{
        id: 3,
        icon: <Groups2 sx={{ color: "white" }}/>,
        label: 'Batches',
        value: 'Batches',
        route: 'app/stakeholder/batches',
    },
    {
        id: 4,
        icon: <QuestionAnswer sx={{ color: "white" }}/>,
        label: 'F.A.Q',
        value: 'Faq',
        route: 'app/faq',
    },
];
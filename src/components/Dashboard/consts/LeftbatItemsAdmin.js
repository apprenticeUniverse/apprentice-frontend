import {
  QuestionAnswer,
  Groups2,
  Face6,
  Assignment,
} from "@mui/icons-material";

export const leftbarItemsAdmin = [
  {
    id: 0,
    icon: <Face6 sx={{ color: "white" }} />,
    label: "Users",
    value: "Users",
    route: "app/admin/users",
  },
  {
    id: 1,
    icon: <Groups2 sx={{ color: "white" }} />,
    label: "Batches",
    value: "Batches",
    route: "app/admin/batches",
  },
  {
    id: 2,
    icon: <Assignment sx={{ color: "white" }} />,
    label: "Assignments",
    value: "Assignments",
    route: "app/admin/assignments",
  },
  {
    id: 3,
    icon: <QuestionAnswer sx={{ color: "white" }} />,
    label: "F.A.Q",
    value: "Faq",
    route: "app/faq",
  },
];

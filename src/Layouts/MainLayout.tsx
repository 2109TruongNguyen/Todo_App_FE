import { createTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Stack, Typography } from "@mui/material";
import AuthContext from "../context/AuthContext";
import { useContext, useMemo, useState } from "react";
import { CheckCircleOutline, DoneAll, Event, Folder, Group, People, Person, Settings, Timeline, Today } from "@mui/icons-material";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "tasks",
    title: "All Tasks",
    icon: <CheckCircleOutline />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Time-based",
  },
  {
    segment: "today",
    title: "Today",
    icon: <Today />,
  },
  {
    segment: "upcoming",
    title: "Upcoming",
    icon: <Event />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Projects",
  },
  {
    segment: "my-projects",
    title: "My Projects",
    icon: <Folder />,
  },
  {
    segment: "team-projects",
    title: "Team Projects",
    icon: <Group />,
    children: [
      {
        segment: "team-overview",
        title: "+",
        icon: <People />,
      },
      {
        segment: "team-members",
        title: "Members",
        icon: <Person />,
      },
    ],
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "productivity",
        title: "Productivity",
        icon: <Timeline />,
      },
      {
        segment: "completed-tasks",
        title: "Completed Tasks",
        icon: <DoneAll />,
      },
    ],
  },
  {
    kind: "divider",
  },
  {
    segment: "settings",
    title: "Settings",
    icon: <Settings />,
  },
];


const demoTheme = createTheme({
  typography: {
    h6: {
      color: "#ff6600",
      fontWeight: "bold",
    },
  },
});

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = useState(initialPath);

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

interface SidebarProps {
  window?: () => Window;
}

function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <img src="src/assets/images/Logo02.png" alt="Logo" width={40} height={40} />
      <Typography variant="h6">Todo App</Typography>
    </Stack>
  );
}

export default function MainLayout(props: SidebarProps) {
  const { window } = props;
  const router = useDemoRouter("/dashboard");
  
  const {user, logoutUser} = useContext(AuthContext);
  
  const userLogin = user;

  const authentication = useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: userLogin?.fullName,
            email: userLogin?.email,
            image: userLogin?.avatarUrl,
          },
        });
      },
      signOut: () => {
        logoutUser();
      },
    };
  }, []);
  
  const [session, setSession] = useState({
    user: {
      name: userLogin?.fullName,
      email: userLogin?.email,
      image: userLogin?.avatarUrl,
    },
  });

  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      session={session}
      navigation={NAVIGATION}
      authentication={authentication}

      //branding={branding}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
        }}
      >
      <PageContainer>
        <Outlet />
      </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

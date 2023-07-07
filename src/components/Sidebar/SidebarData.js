import React from "react";
import * as FaIcons from 'react-icons/fa';

export const SidebarData = [
    {
        title: "Tablolar",
        icon: <FaIcons.FaTable />,
        link: "/projects/:id",
    },
    {
        title: "Endpointler",
        icon: <FaIcons.FaLink />,
        link: "/projects/:id/endpoints"
    },
    {
        title: "Tüm Projelere Dön",
        icon: <FaIcons.FaArrowLeft />,
        link: "/projects"
    },
]

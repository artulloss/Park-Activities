/// <reference types="vite/client" />

interface Park {
    states: string;
    parkCode: string;
    designation: string;
    fullName: string;
    url: string;
    name: string;
}

interface Activity {
    id: string;
    name: string;
    parks: Park[];
}

interface ActivityResponse {
    total: string;
    limit: string;
    start: string;
    data: Activity[];
}
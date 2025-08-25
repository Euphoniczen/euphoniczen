"use client";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./playlistcalendar.css";

interface Calendar_Interface {
    date: string
    setDate:React.Dispatch<React.SetStateAction<string>>
}

export const PlaylistCalendar = ({
    date, 
    setDate
}:Calendar_Interface) => {
    const customTheme = createTheme({
        palette: {
            primary: {
                main: "#d27272",
                contrastText: "#fff"
            }
        }
    });

    const timeRanges = [
        "Today",
        "This Week",
        "Last 2 Weeks",
        "Last Month",
        "Last 3 Months",
        "Last 5 Months",
        "Last 6 Months",
        "Last Year",
    ];

    const [currentPage, setCurrentPage] = useState(2);
    // const [date, setDate] = useState<string>("");

    // Function to calculate date based on selected range
    function handleChangeDateFunction(range: string) {
        const now = new Date();
        let newDate = new Date();

        switch (range) {
            case "Today":
                newDate = now;
                break;
            case "This Week":
                newDate.setDate(now.getDate() - 7);
                break;
            case "Last 2 Weeks":
                newDate.setDate(now.getDate() - 14);
                break;
            case "Last Month":
                newDate.setMonth(now.getMonth() - 1);
                break;
            case "Last 3 Months":
                newDate.setMonth(now.getMonth() - 3);
                break;
            case "Last 5 Months":
                newDate.setMonth(now.getMonth() - 5);
                break;
            case "Last 6 Months":
                newDate.setMonth(now.getMonth() - 6);
                break;
            case "Last Year":
                newDate.setFullYear(now.getFullYear() - 1);
                break;
            default:
                newDate = now;
        }

        setDate(newDate.toDateString());
    }

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        const selectedRange = timeRanges[value - 1];
        handleChangeDateFunction(selectedRange);
    };

    // Set initial date on first render
    useEffect(() => {
        handleChangeDateFunction(timeRanges[currentPage - 1]);
    }, []);

    return (
        <ThemeProvider theme={customTheme}>
            <div className="container-for-pagnate-calendar" style={{ marginTop: "3%" }}>
                <div>
                    <Pagination
                        count={timeRanges.length}
                        siblingCount={0}
                        boundaryCount={timeRanges.length}
                        page={currentPage}
                        onChange={handleChange}
                        color="primary"
                        className="pagnate-calendar-preview"
                        size="small"
                        renderItem={(item) => (
                            <PaginationItem
                                {...item}
                                components={{
                                    previous: undefined,
                                    next: undefined,
                                }}
                                page={item.page ? timeRanges[item.page - 1] : ""}
                            />
                        )}
                    />
                </div>

                {/* Date display */}
                <p style={{
                    fontWeight: 'bold',
                    marginTop: '10px',
                    paddingLeft: '10px'
                }}>
                    Date: {date}
                </p>
            </div>
        </ThemeProvider>
    );
};
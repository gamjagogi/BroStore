import React, { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const Rate = ({ count, color }) => {
    const [rated, setRating] = useState(4);
    const getColor = (index) => {
        if (rated >= index) {
            return "#f5eb3b";
        }
        return color.unfilled;
    };

    const starRating = useMemo(() => {
        return Array(count)
            .fill(0)
            .map((_, i) => i + 1)
            .map((idx) => (
                <FontAwesomeIcon
                    key={idx}
                    size="3x"
                    className="cursor-pointer"
                    icon={faStar}
                    style={{ color: getColor(idx) }}
                />
            ));
    }, []);

    return <div>{starRating}</div>;
};

Rate.defaultProps = {
    count: 5,
    color: {
        filled: "#f5eb3b",
        unfilled: "dcdcdc"
    }
};
export default Rate;

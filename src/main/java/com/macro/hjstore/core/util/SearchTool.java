package com.macro.hjstore.core.util;

import com.macro.hjstore.dto.SearchDTO;
import org.apache.commons.lang3.StringUtils;


public class SearchTool {

    private static int getCountKeywordOccurrences(SearchDTO.Response response, String keyword) {
        // Count how many times the keyword appears in the fields of Delivery entity
        int count = 0;
        if (response.getContent() != null) {
            count += StringUtils.countMatches(response.getContent().toLowerCase(), keyword.toLowerCase());
        }
        if (response.getTitle() != null) {
            count += StringUtils.countMatches(response.getTitle().toLowerCase(), keyword.toLowerCase());
        }
        return count;
    }
}

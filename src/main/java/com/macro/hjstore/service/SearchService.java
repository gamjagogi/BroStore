package com.macro.hjstore.service;

import com.macro.hjstore.core.annotation.MyLog;
import com.macro.hjstore.dto.SearchDTO;
import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.board.BoardJPQLRepository;
import com.macro.hjstore.model.board.BoardRepository;
import com.macro.hjstore.model.deliveryProduct.Delivery;
import com.macro.hjstore.model.deliveryProduct.DeliveryJPQLRepository;
import com.macro.hjstore.model.deliveryProduct.DeliveryRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class SearchService {
    private final BoardJPQLRepository boardJPQLRepository;
    private final DeliveryJPQLRepository deliveryJPQLRepository;

    @MyLog
    public List<SearchDTO.Response>검색(String keyword) throws Exception{

        ArrayList<SearchDTO.Response>allList = new ArrayList<>();

        List<Delivery> deliveryList = deliveryJPQLRepository.findAllByKeyword(keyword);
        allList.addAll(deliveryList.stream().map(delivery -> new SearchDTO.Response(delivery)).collect(Collectors.toList()));
        List<Board> boardList = boardJPQLRepository.findAllByKeyword(keyword);
        allList.addAll(boardList.stream().map(board -> new SearchDTO.Response(board)).collect(Collectors.toList()));

        Collections.sort(allList, new Comparator<SearchDTO.Response>() {
            @Override
            public int compare(SearchDTO.Response o1, SearchDTO.Response o2) {
                int count1 = getCountKeywordOccurrences(o1, keyword);
                int count2 = getCountKeywordOccurrences(o2, keyword);
                return Integer.compare(count2, count1);
            }
        });
        return allList;
    }

    private int getCountKeywordOccurrences(SearchDTO.Response response, String keyword) {
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

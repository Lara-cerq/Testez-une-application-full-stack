package com.openclassrooms.starterjwt.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.models.Session;
import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
public class SessionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser
    public void testGetSessions() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.get("/api/session"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id", CoreMatchers.is(1)));
    }

    @Test
    @WithMockUser
    public void testGetOneSession() throws Exception {

        Session session = new Session();
        session.setId(1L);
        session.setName("test");
        session.setDate(new Date());
        session.setDescription("session test");


        mockMvc.perform(MockMvcRequestBuilders.get("/api/session/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id", CoreMatchers.is(1)));
    }
    @Test
    @WithMockUser
    public void testSessionNotFound() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/session/100"))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @WithMockUser
    public void testSessionBadRequest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/session/Margot"))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @WithMockUser
    public void testCreateSession() throws Exception {

        SessionDto sessionDto= new SessionDto();
        sessionDto.setName("test");
        sessionDto.setDate(new Date());
        sessionDto.setUsers(null);
        sessionDto.setTeacher_id(1L);
        sessionDto.setDescription("session test");
        mockMvc.perform(MockMvcRequestBuilders.post("/api/session")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(sessionDto))
                       .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("session test"));
    }

    @Test
    @WithMockUser
    public void testUpdateSession() throws Exception {
        SessionDto session= new SessionDto();
        session.setName("test update");
        session.setDate(new Date());
        List<Long> users= new ArrayList<>();
        users.add(1L);
        session.setUsers(users);
        session.setTeacher_id(1L);
        session.setDescription("session test update");
        mockMvc.perform(MockMvcRequestBuilders.put("/api/session/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(session))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("test update"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("session test update"));
    }

    @Test
    @WithMockUser
    public void testDeleteSession() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/session/79"))
                .andExpect(MockMvcResultMatchers.status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/session/0"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    @WithMockUser
    public void testParticipateUser() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.post("/api/session/1/participate/3"))
                .andExpect(MockMvcResultMatchers.status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.post("/api/session/1/participate/3"))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
        mockMvc.perform(MockMvcRequestBuilders.post("/api/session/0/participate/3"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
        mockMvc.perform(MockMvcRequestBuilders.post("/api/session/1/participate/0"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());

    }

    @Test
    @WithMockUser
    public void testNoLongerParticipateUser() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/session/1/participate/1"))
               .andExpect(MockMvcResultMatchers.status().isOk());
//        mockMvc.perform(MockMvcRequestBuilders.delete("/api/session/1/participate/3"))
//                .andExpect(MockMvcResultMatchers.status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/session/0/participate/1"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/session/1/participate/17"))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());

    }
}

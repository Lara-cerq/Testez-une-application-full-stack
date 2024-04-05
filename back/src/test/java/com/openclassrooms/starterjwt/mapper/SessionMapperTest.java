package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.services.TeacherService;
import com.openclassrooms.starterjwt.services.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(MockitoExtension.class)
@SpringBootTest(classes = {SessionMapperImpl.class})
public class SessionMapperTest {

    @Autowired
    private SessionMapperImpl sessionMapper;

    @MockBean
    private TeacherService teacherService;

    @MockBean
    private UserService userService;

    @Test
    public void dtoListToEntityListTest() {
        User user = new User(1L, "test", "Admin", "Admin", "test", true, null, null);

        Mockito.when(userService
                .findById(1L)).thenReturn(user);

        List<User> userList= new ArrayList<>();
        userList.add(user);

        List<Long> users= new ArrayList<>();
        users.add(user.getId());

        Teacher teacher = new Teacher(1L, "teacher", "teacher", null, null);

        Mockito.when(teacherService
               .findById(1L)).thenReturn(teacher);

        Session session = new Session(1L, "session", null, "session test", teacher, userList, null, null );

        SessionDto sessionDto = new SessionDto(1L, "session", null, teacher.getId(), "session test", users , null, null );

        List<Session> sessionsList= new ArrayList<>();
        sessionsList.add(session);

        List<SessionDto> dtoList= new ArrayList<>();
        dtoList.add(sessionDto);

        Assertions.assertEquals(teacher.getId(), sessionDto.getTeacher_id());
        Assertions.assertEquals(user.getId(), sessionDto.getUsers().get(0));

        Assertions.assertEquals(sessionsList, sessionMapper.toEntity(dtoList));

    }

    @Test
    public void dtoToEntityTest() {
        User user = new User(1L, "test", "Admin", "Admin", "test", true, null, null);

        List<User> userList= new ArrayList<>();
        userList.add(user);

        List<Long> users= new ArrayList<>();
        users.add(user.getId());

        Teacher teacher = new Teacher(1L, "teacher", "teacher", null, null);

        Session session = new Session(1L, "session", null, "session test", teacher, userList, null, null );

        SessionDto sessionDto = new SessionDto(1L, "session", null, teacher.getId(), "session test", users , null, null );

        Mockito.when(teacherService
                .findById(sessionDto.getTeacher_id())).thenReturn(teacher);

        Mockito.when(userService
                .findById(user.getId())).thenReturn(user);

        Assertions.assertNotNull(session.getTeacher());
        Assertions.assertNotNull(session.getUsers());

        Assertions.assertEquals(session, sessionMapper.toEntity(sessionDto));

    }

    @Test
    public void dtoListNullToEntityListTest() {
//        User user = new User(1L, "test", "Admin", "Admin", "test", true, null, null);
//
//        Mockito.when(userService
//                .findById(1L)).thenReturn(user);
//
//        List<User> userList= new ArrayList<>();
//        userList.add(user);
//
//        List<Long> users= new ArrayList<>();
//        users.add(user.getId());
//
//        Teacher teacher = new Teacher(1L, "teacher", "teacher", null, null);
//
//        Mockito.when(teacherService
//                .findById(1L)).thenReturn(teacher);
//
//        Session session = new Session(1L, "session", null, "session test", teacher, userList, null, null );
//
//        List<Session> sessionsList= new ArrayList<>();
//        sessionsList.add(session);
        List<SessionDto> dtoList= null;

        Assertions.assertNull(sessionMapper.toEntity(dtoList));

    }

    @Test
    public void entityListNullToDtoListTest() {
//        User user = new User(1L, "test", "Admin", "Admin", "test", true, null, null);
//
//        Mockito.when(userService
//                .findById(1L)).thenReturn(user);
//
//        List<User> userList= new ArrayList<>();
//        userList.add(user);
//
//        List<Long> users= new ArrayList<>();
//        users.add(user.getId());
//
//        Teacher teacher = new Teacher(1L, "teacher", "teacher", null, null);
//
//        Mockito.when(teacherService
//                .findById(1L)).thenReturn(teacher);

        //Session session = new Session(1L, "session", null, "session test", teacher, userList, null, null );

        List<Session> sessionsList= null;

        Assertions.assertNull(sessionMapper.toDto(sessionsList));

    }

    @Test
    public void sessionDtoNullTest() {
        SessionDto sessionDto = null;

        Assertions.assertNull(sessionMapper.toEntity(sessionDto));
    }

    @Test
    public void entitySessionNullTest() {
        Session session = null;

        Assertions.assertNull(sessionMapper.toDto(session));
    }

    @Test
    public void teacherNullTest() {

        Session session = new Session(1L, "session", null, "session test", null, new ArrayList<>(), null, null );

        SessionDto sessionDto = sessionMapper.toDto(session);

        Assertions.assertNull(sessionDto.getTeacher_id());
    }

    @Test
    public void toEntityTest() {
        User user = new User(1L, "test", "Admin", "Admin", "test", true, null, null);

        List<User> userList = new ArrayList<>();
        userList.add(user);

        List<Long> users = new ArrayList<>();
        users.add(user.getId());

        Teacher teacher = new Teacher(1L, "teacher", "teacher", null, null);

        Session session = new Session(1L, "session", null, "session test", null, null, null, null);

        SessionDto sessionDto = new SessionDto(1L, "session", null, null, "session test", null, null, null);

        Mockito.when(teacherService
                .findById(sessionDto.getTeacher_id())).thenReturn(teacher);

        Mockito.when(userService
                .findById(user.getId())).thenReturn(user);

        Assertions.assertEquals(session, sessionMapper.toEntity(sessionDto));
       // Assertions.assertEquals(1L, session.getUsers().get(0).getId());
    }

    @Test
    public void toDtoTest() {
        User user = new User(1L, "test", "Admin", "Admin", "test", true, null, null);

        List<User> userList = new ArrayList<>();
        //userList.add(user);

        List<Long> users = new ArrayList<>();
        //users.add(user.getId());

        Teacher teacher = new Teacher(1L, "teacher", "teacher", null, null);

        Session session = new Session(1L, "session", null, "session test", null, userList, null, null);

        SessionDto sessionDto = new SessionDto(1L, "session", null, null, "session test", users , null, null);

        Mockito.when(teacherService
                .findById(null)).thenReturn(null);

        Assertions.assertEquals(sessionDto, sessionMapper.toDto(session));
        // Assertions.assertEquals(1L, session.getUsers().get(0).getId());
    }
}
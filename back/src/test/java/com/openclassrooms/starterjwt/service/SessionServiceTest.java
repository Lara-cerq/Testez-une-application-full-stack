package com.openclassrooms.starterjwt.service;

import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.services.SessionService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class SessionServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private SessionRepository sessionRepository;

    Teacher teacher = new Teacher(1L, "teacher", "teacher", null, null);

    @Test
    public void testParticipate() {

        SessionService sessionService = new SessionService(sessionRepository, userRepository);

        User user = new User("test", "test", "test", "test", true);
        List<User> users = new ArrayList<>();
        users.add(user);

        Session session = new Session(1L, "session", null, "session test", null, users, null, null);

        Mockito.when(userRepository
                .findByEmail(Mockito.anyString())).thenReturn(Optional.of(user));

        Mockito.when(sessionRepository
                .findById(1L)).thenReturn(Optional.of(session));
        //sessionService.participate(session.getId(), user.getId());

        Assertions.assertEquals(session.getUsers().get(0).getId(), user.getId());

    }

    @Test
    public void testNoLonguerParticipate() {

        SessionService sessionService = new SessionService(sessionRepository, userRepository);

        User user = new User(1L, "test", "test", "test", "test", true, null, null);
        List<User> users = new ArrayList<>();
        users.add(user);

        Session session = new Session(1L, "session", null, "session test", null, users, null, null);

        Mockito.when(sessionRepository
                .findById(1L)).thenReturn(Optional.of(session));

        Assertions.assertEquals(session.getUsers().get(0).getId(), user.getId());

        sessionService.noLongerParticipate(session.getId(),user.getId());

        Assertions.assertTrue(session.getUsers().isEmpty());

    }



}

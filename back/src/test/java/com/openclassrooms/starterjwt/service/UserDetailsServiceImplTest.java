package com.openclassrooms.starterjwt.service;


import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.security.services.UserDetailsServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class UserDetailsServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Test
    public void testLoadUserByUsername() {
        // prepare the test with mock
        UserDetailsServiceImpl userDetailsService= new UserDetailsServiceImpl(userRepository);
        User user = new User("test", "test", "test", "test", true);
        Mockito.when(userRepository
                .findByEmail(Mockito.anyString())).thenReturn(Optional.of(user));
        // execute the function to test
        UserDetails userDetails = userDetailsService.loadUserByUsername("test");
        // verify the result
        Assertions.assertEquals("test", userDetails.getUsername());
    }
}

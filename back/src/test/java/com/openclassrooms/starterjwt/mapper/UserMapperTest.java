package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.models.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest(classes = {UserMapperImpl.class})
public class UserMapperTest {

    @Autowired
    private UserMapperImpl userMapper;

    UserDto userDto = new UserDto(1L, "test", "Admin", "Admin", true, "test", null, null);

    UserDto userDto2 = new UserDto(2L, "test", "Admin", "Admin", true, "test", null, null);

    User user = new User(1L, "test", "Admin", "Admin", "test", true, null, null);

    User user2 = new User(2L, "test", "Admin", "Admin", "test", true, null, null);

    @Test
    public void userDtoToEntityTest() {
        Assertions.assertEquals(user, userMapper.toEntity(userDto));
    }

    @Test
    public void entityToUserDtoTest() {
        Assertions.assertEquals(userDto, userMapper.toDto(user));
    }

    @Test
    public void entityListToUserDtoListTest() {

        List<User> usersList= new ArrayList<>();
        usersList.add(user);
        usersList.add(user2);

        List<UserDto> dtoList= new ArrayList<>();
        dtoList.add(userDto);
        dtoList.add(userDto2);

        Assertions.assertEquals(dtoList, userMapper.toDto(usersList));
    }

    @Test
    public void dtoListToUserEntityListTest() {

        List<User> usersList= new ArrayList<>();
        usersList.add(user);
        usersList.add(user2);

        List<UserDto> dtoList= new ArrayList<>();
        dtoList.add(userDto);
        dtoList.add(userDto2);

        Assertions.assertEquals(usersList, userMapper.toEntity(dtoList));
    }

    @Test
    public void userDtoNullTest() {
        UserDto userDtoNull= null;

        Assertions.assertNull(userMapper.toEntity(userDtoNull));
    }

    @Test
    public void entityNullTest() {
        User userNull= null;

        Assertions.assertNull( userMapper.toDto(userNull));
    }

    @Test
    public void entityListNullTest() {

        List<User> usersList= null;

        Assertions.assertNull(userMapper.toDto(usersList));
    }

    @Test
    public void dtoListNullTest() {

        List<UserDto> dtoList= null;

        Assertions.assertNull(userMapper.toEntity(dtoList));
    }

}

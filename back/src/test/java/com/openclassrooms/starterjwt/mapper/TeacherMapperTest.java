package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest(classes={TeacherMapperImpl.class})
public class TeacherMapperTest {

    @Autowired
    private TeacherMapperImpl teacherMapper;

    Teacher teacher = new Teacher(1L, "teacher", "teacher", null, null);

    TeacherDto teacherDto= new TeacherDto(1L, "teacher", "teacher", null, null);

    @Test
    public void entityToTeacherDtoTest() {
        Assertions.assertEquals(teacherDto, teacherMapper.toDto(teacher));
    }

    @Test
    public void teacherDtoToEntityTest() {
        Assertions.assertEquals(teacher, teacherMapper.toEntity(teacherDto));
    }

    @Test
    public void entityListToTeacherDtoListTest() {
        List<Teacher> teacherList= new ArrayList<>();
        teacherList.add(teacher);

        List<TeacherDto> dtoList= new ArrayList<>();
        dtoList.add(teacherDto);
        Assertions.assertEquals(dtoList, teacherMapper.toDto(teacherList));
    }

    @Test
    public void teacherDtoListToEntityListTest() {
        List<Teacher> teacherList= new ArrayList<>();
        teacherList.add(teacher);

        List<TeacherDto> dtoList= new ArrayList<>();
        dtoList.add(teacherDto);
        Assertions.assertEquals(teacherList, teacherMapper.toEntity(dtoList));
    }

    @Test
    public void userDtoNullTest() {
        TeacherDto teacherDtoNull= null;

        Assertions.assertNull(teacherMapper.toEntity(teacherDtoNull));
    }

    @Test
    public void entityNullTest() {
        Teacher teacherNull= null;

        Assertions.assertNull( teacherMapper.toDto(teacherNull));
    }

    @Test
    public void entityListNullTest() {

        List<Teacher> teachersList= null;

        Assertions.assertNull(teacherMapper.toDto(teachersList));
    }

    @Test
    public void dtoListNullTest() {

        List<TeacherDto> dtoList= null;

        Assertions.assertNull(teacherMapper.toEntity(dtoList));
    }
}

package com.umcap.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.umcap.ems.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}

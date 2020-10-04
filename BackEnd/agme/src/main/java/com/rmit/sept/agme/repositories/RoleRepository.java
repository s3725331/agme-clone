package com.rmit.sept.agme.repositories;

import com.rmit.sept.agme.model.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoleRepository extends CrudRepository<Role, String> {
    Optional<Role> getByName(String name);
}

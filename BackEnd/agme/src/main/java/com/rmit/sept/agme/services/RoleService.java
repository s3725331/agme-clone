package com.rmit.sept.agme.services;

import com.rmit.sept.agme.model.Role;
import com.rmit.sept.agme.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {
    @Autowired
    RoleRepository roleRepository;

    public Optional<Role> getRole(String role){
        return roleRepository.getByName(role);
    }
}

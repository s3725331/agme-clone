package com.rmit.sept.agme.repositories;

import com.rmit.sept.agme.model.TemplateEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

//Long is used as it is type of TemplateEntity id
public interface TemplateRepository extends CrudRepository<TemplateEntity, Long> {

    @Override
    Optional<TemplateEntity> findById(Long id);
}

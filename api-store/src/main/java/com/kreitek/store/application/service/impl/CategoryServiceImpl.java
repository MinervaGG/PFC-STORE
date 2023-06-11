package com.kreitek.store.application.service.impl;

import com.kreitek.store.application.dto.CategoryDTO;
import com.kreitek.store.application.mapper.CategoryMapper;
import com.kreitek.store.application.service.CategoryService;
import com.kreitek.store.domain.entity.Category;
import com.kreitek.store.domain.entity.Item;
import com.kreitek.store.domain.persistence.CategoryPersistence;
import com.kreitek.store.infrastructure.persistence.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryPersistence persistence;
    private final CategoryMapper mapper;
    private final ItemRepository itemRepository;

    @Autowired
    public CategoryServiceImpl(CategoryPersistence persistence, CategoryMapper mapper, ItemRepository itemRepository) {
        this.persistence = persistence;
        this.mapper = mapper;
        this.itemRepository = itemRepository;
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = this.persistence.getAllCategories();
        return mapper.toDto(categories);
    }

    @Override
    public Optional<CategoryDTO> getCategoryById(Long categoryId) {
        return this.persistence.getCategoryById(categoryId).map(mapper::toDto);
    }

    @Override
    public CategoryDTO saveCategory(CategoryDTO categoryDTO) {
        Category category = this.persistence.saveCategory(this.mapper.toEntity(categoryDTO));
        return this.mapper.toDto(category);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        List<Item> items = itemRepository.findAllByCategoryId(categoryId);
        itemRepository.deleteAll(items);
        this.persistence.deleteCategory(categoryId);
    }

    @Override
    public List<CategoryDTO> getAllCategoriesByName(String partialName) {
        List<Category> categories = this.persistence.getCategoryByName(partialName);
        return mapper.toDto(categories);
    }
}

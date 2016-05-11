**An angular JS directive for 2 level cascade select dropdown**

Use:
The directive can be called from HTML as: ```<cascade-select></cascade-select>```

Options are:

    ```
    input-model="theInputModel"
    
    output-model="theOutputModel"
    
    display-name="nameOfTheFieldThatIsUsedToDisplayTheTextAndItems"
    
    disabled="isDisabled"
    ```
        
TODO: For now you need to:

- Change the path of template (cascadeSelect.html) in cascadeSelect.js file.
- Change the path of css (cascadeSelect.css) in cascadeSelect.htm file.
     
Both of them should have the absolute path of URL from root URL.
In future the path(s) will be made fixed so that they don't need to be changed. 
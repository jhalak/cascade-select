/**
 * Created by: <onirudda.odikare@widespace.com>
 * Created on: 5/2/16.
 *
 * "cascade-select" directive for AngularJS
 * Its used create a cascade type single select dropdown.
 *
 * @description
 * The directive can be called from HTML as: <cascade-select></cascade-select>
 * options are:
    input-model="theInputModel"
    output-model="theOutputModel"
    display-name="nameOfTheFieldThatIsUsedToDisplayTheTextAndItems"
    disabled="isDisabled">
 *
 * @dependency: bootstrap
 * @author: Jhalak
 * @copyright: Widespace
 */

/*global
 angular, _,
 */
angular.module('cascadeSelect', [])
    .directive('cascadeSelect', function() {
        'use strict';
        return {
            templateUrl: '/coach/app/common/directives/cascade-select/cascadeSelect.html',
            restrict: 'E',
            replace: true,
            scope: {
                inputModel: '=',
                outputModel: '=',
                displayName: '@',
                disabled: '='
            },
            controller: function ($scope) {
                /**
                 * Handler function when an item is selected
                 * @param selectedItem
                 */
                $scope.handleSelection = function (selectedItem) {
                    $scope.outputModel = selectedItem;
                    $scope.searchTerm = '';
                };

                /**
                 * Check if the child is selected from a parent
                 *
                 * @param parent
                 *
                 * @returns {boolean}
                 */
                $scope.isChildSelected = function (parent) {
                    var childSelected = false;
                    _.forEach(parent.children.data, function (child) {
                        if (child.id === $scope.outputModel.id) {
                            childSelected = true;
                            return;
                        }
                    });

                    return childSelected;
                };

                /**
                 * Delete the selected item
                 */
                $scope.deleteSelected = function () {
                    $scope.outputModel = {id: null};
                };

                $scope.hoveredItem = {};
            }
        };
    })
    .filter('cascadeFilter', function() {
        return function(list, name, displayName) {
            if (name === undefined || name.length === 0) {
                return list;
            }
            var items = [];
            _.forEach(list, function (item) {
                // If searched item is found in main category name, push the item in items list.
                if (item[displayName].toLowerCase().includes(name.toLowerCase())) {
                    items.push(item);
                } else {
                    // Searched item is not found in main category list,
                    var children = item.children.data, childItems = [];
                    _.forEach(children, function (child) {
                        // If searched item is found in children list, make the children array
                        if (child[displayName].toLowerCase().includes(name.toLowerCase())) {
                            childItems.push(child);
                        }
                    });
                    // If searched item is found in children list, replace the children array to children.data attribute
                    // Then push the whole item object to the main items array.
                    if (childItems.length > 0) {
                        item.children.data = childItems;
                        items.push(item);
                    }
                }
            });

            return items;
        }
    });

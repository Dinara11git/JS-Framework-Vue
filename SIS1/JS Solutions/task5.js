var snail = function(nums) {
    let result = [];

    while (nums.length > 0) {
        result.push(...nums.shift());

        for (let i = 0; i < nums.length; i++) {
            result.push(nums[i].pop());
        }

        if (nums.length > 0) {
            result.push(...nums.pop().reverse());
        }

        for (let i = nums.length - 1; i >= 0; i--) {
            result.push(nums[i].shift());
        }
    }

    return result;
};
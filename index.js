const express = require('express');


const app = express();
const port = process.env.PORT || 3020;

app.use(express.json());
app.use('/users', router.userRouter)

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})
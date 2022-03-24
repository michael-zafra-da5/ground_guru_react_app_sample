export const UserList = ({ data }) => 
<ul>
    {
        data !== undefined ? data.map(item => 
            Object.keys(item).map((key,index) => 
                <p>{item[key]}</p>
            )
        ) : ''
    }
</ul>
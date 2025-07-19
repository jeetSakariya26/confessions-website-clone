

const generateInviteCode = ()=>{
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for(let i = 0; i < 6; i++){
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

const setInviteCode = async (req, res) => {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).send("Group not found");

    const code = generateInviteCode();
    group.inviteCode = code;
    group.inviteExpiry = Date.now() + 1000 * 60 * 60; // 1 hour validity

    await group.save();
    res.json({ inviteCode: code });
};

